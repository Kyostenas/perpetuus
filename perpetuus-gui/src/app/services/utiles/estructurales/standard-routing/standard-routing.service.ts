import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FragmentCallbackService } from '../fragment-callback/fragment-callback.service';
import { ControlQueriesUrlService } from '../control-queries-url/control-queries-url.service';
import { DeepValues } from 'src/app/utiles/tipos-personalizados';

@Injectable({
    providedIn: 'root',
})
export class StandardRoutingService {
    constructor(
        private router: Router,
        private fragment_service: FragmentCallbackService,
        private query_service: ControlQueriesUrlService
    ) {}

    /**
     *
     * @param path_fragments The segments of the url
     * @param hash_fragment a fragment to add at the
     * @param clean
     */
    navigate(
        path_fragments: string[],
        hash_fragment?: DeepValues<
            typeof this.fragment_service.ALLOWED_FRAGMENTS,
            string
        >,
        clean: boolean = true
    ) {
        if (clean) {
            this.query_service.limpiar_todo();
            this.fragment_service.clean_fragment();
        }
        this.router.navigate(path_fragments, {
            preserveFragment: true,
        });
        if (hash_fragment) {
            this.fragment_service.add_fragment(hash_fragment);
        }
    }

    go_back() {
        this.query_service.limpiar_todo();
        this.fragment_service.clean_fragment();
        this.router.navigate(['../']);
    }

    open_form() {
        this.navigate(['./form']);
        this.query_service.queries.editing_form.accion.definir(false);
    }

    edit_form() {
        this.navigate(['./'], undefined, false);
        this.query_service.queries.editing_form.accion.definir(false);
    }
}
