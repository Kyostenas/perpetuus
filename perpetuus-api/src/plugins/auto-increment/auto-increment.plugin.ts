import { Document, Schema } from 'mongoose';
import { ACCIONES_MONGOOSE } from '../../utils/constantes.utils';
import { COUNTER_MODEL } from './auto-increment.model';

export function auto_increment(schema: Schema, options: AutoIncrementOptions) {
    schema.pre(ACCIONES_MONGOOSE.SAVE, async function (next: any) {
        const COLLECTION_NAME = this.collection.name ?? schema.get('collection');
        const COUNTER_ID = `${COLLECTION_NAME}_counter`;
        const EXISTENTE = await COUNTER_MODEL.findOne({counter_id: COUNTER_ID})
        if (!!EXISTENTE) {
            await COUNTER_MODEL.findOneAndUpdate(
                {
                    counter_id: COUNTER_ID,
                },
                {
                    current: EXISTENTE.current + 1
                }
            )
            this[options.field] = EXISTENTE.current + 1
        } else {
            await new COUNTER_MODEL({
                counter_id: COUNTER_ID,
                current: 1
            }).save()
            this[options.field] = 1
        }
        next();
    });
}

export interface AutoIncrementOptions {
    field: string;
}
