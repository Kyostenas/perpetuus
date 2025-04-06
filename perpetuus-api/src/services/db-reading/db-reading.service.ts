import { ModelType } from '@typegoose/typegoose/lib/types';
import {
    generar_criterios_sort,
    obtener_paginacion,
} from '../../utils/busqueda-paginacion.utiles';
import { Request } from 'express';

export default class DBReadingService<T> {
    private pagination: Paginacion;
    private model: ModelType<T>;
    private term?: string;
    private filters?: any;
    private filters_function?: Function;
    private projection?: { [type: string]: 1 | 0 | string };
    private paths_to_populate?: PathsToPopulate[];

    constructor({
        pagination,
        model,
        term,
        filters,
        filters_function,
        projection,
        paths_to_populate,
    }: {
        pagination: Paginacion;
        model: ModelType<T>;
        term?: string;
        filters?: any;
        filters_function?: Function;
        projection?: { [type: string]: 1 | 0 | string };
        paths_to_populate?: PathsToPopulate[];
    }) {
        this.pagination = pagination;
        this.model = model;
        this.term = term;
        this.filters = filters;
        this.filters_function = filters_function;
        this.projection = projection;
        this.paths_to_populate = paths_to_populate;
    }

    private generate_text_search_query({
        text_search_term,
        regex_term,
    }: {
        text_search_term?: string;
        regex_term?: string;
    }): any {
        let query: { [type: string]: any } = {};
        if (!!text_search_term) {
            query.$text = {
                $search: `${text_search_term} "${text_search_term}"`,
            };
        } else if (!!regex_term) {
            query.text_search_value = { $regex: regex_term, $options: 'i' };
        }
        return query;
    }

    async smart_read() {
        let term_object: { [type: string]: any } = {
            text_search_term: this.term,
        };
        let query = this.generate_text_search_query(term_object);
        let total = await this.model.countDocuments(query);
        if (total === 0) {
            term_object.regex_term = this.term;
            delete term_object.text_search_term;
            query = this.generate_text_search_query(term_object);
            total = await this.model.countDocuments(query);
        }
        const IS_TEXT_SEARCH = !!query.$text;
        const SORT_AND_SEARCH_CRITERIA = generar_criterios_sort(
            this.pagination,
            IS_TEXT_SEARCH,
        );
        const PROEJECTION = IS_TEXT_SEARCH
            ? { ...SORT_AND_SEARCH_CRITERIA.PROJECTION, ...this.projection }
            : (this.projection ?? {});
        this.pagination.pagina_actual =
            Math.floor(this.pagination.desde / this.pagination.limite) + 1;
        // this.pagination.pagina_actual = this.pagination.desde / this.pagination.limite
        this.pagination.total_de_paginas = Math.ceil(
            total / this.pagination.limite,
        );
        this.pagination.total_elementos = total;
        const RESULT = await this.model
            .find(query, PROEJECTION)
            .skip(this.pagination.desde)
            .limit(this.pagination.limite)
            .sort(SORT_AND_SEARCH_CRITERIA.CRITERIOS_SORT)
            .populate(this.paths_to_populate ?? [])
            .lean();
        return { result: RESULT, total, pagination: this.pagination };
    }
}

interface SortCriteria {
    score?: { $meta: 'textScore' };
    [type: string]: any;
}
