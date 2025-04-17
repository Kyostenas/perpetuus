import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeepValues } from 'src/app/utiles/tipos-personalizados';

@Injectable({
    providedIn: 'root',
})
export class FragmentCallbackService {
    constructor(private router: Router) {}

    private callbacks: {
        [key: string]: {
            aparicion_fragmento: () => void;
            eliminado_fragmento: () => void;
        };
    } = {};

    register_callback(
        fragment: DeepValues<typeof this.ALLOWED_FRAGMENTS, string>,
        callback_fragment_aparition: () => void,
        callback_fragment_deletion: () => void
    ): void {
        this.callbacks[fragment] = {
            aparicion_fragmento: callback_fragment_aparition,
            eliminado_fragmento: callback_fragment_deletion,
        };
    }

    private fragmento_actual!: string;
    execute_aparition_callback(
        fragment: DeepValues<typeof this.ALLOWED_FRAGMENTS, string>
    ): void {
        this.fragmento_actual = fragment;
        if (!!this.callbacks[fragment]) {
            this.callbacks[fragment]['aparicion_fragmento']();
        }
    }

    execute_deletion_callback(): void {
        if (!!this.callbacks[this.fragmento_actual]) {
            this.callbacks[this.fragmento_actual]['eliminado_fragmento']();
        }
    }

    clean_fragment(): void {
        this.router.navigate([], {
            queryParamsHandling: 'preserve',
            fragment: undefined,
        });
        this.execute_deletion_callback();
    }

    add_fragment(fragment: DeepValues<typeof this.ALLOWED_FRAGMENTS, string>) {
        this.router
            .navigate([], {
                queryParamsHandling: 'preserve',
                fragment: undefined,
            })
            .then(() => {
                this.router.navigate([], {
                    queryParamsHandling: 'preserve',
                    fragment: fragment,
                });
            });
    }

    process_string(
        fragment: string | undefined | null
    ): DeepValues<typeof this.ALLOWED_FRAGMENTS, string> {
        if (!!fragment) {
            if (Object.keys(this.ALLOWED_FRAGMENTS).includes(fragment)) {
                return <DeepValues<typeof this.ALLOWED_FRAGMENTS, string>>(
                    this.ALLOWED_FRAGMENTS_PRIVATE[fragment]
                );
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    ALLOWED_FRAGMENTS = {
        global_search: 'global_search',
        user_profile: 'user_profile',
        user_notifications: 'user_notifications',

        /**
         * DO NOT USE
         */
        _: '', // necessary
    } as const;

    private ALLOWED_FRAGMENTS_PRIVATE: { [type: string]: string } = {
        global_search: 'global_search',
        user_profile: 'user_profile',
        user_notifications: 'user_notifications',

        /**
         * DO NOT USE
         */
        _: '', // necessary
    };
}
