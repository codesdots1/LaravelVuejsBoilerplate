<template>
    <span>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="warning" class="mb-2 mr-2" v-on="on"><v-icon small>{{ icons.mdiExport }}</v-icon></v-btn>
            </template>
            <span>Export</span>
        </v-tooltip>
        <error-modal :errorArr="errorArr" v-model="errorDialog"></error-modal>
    </span>
</template>

<script>
    import CommonServices from '../common_services/common.js';
    import ErrorModal from '../partials/ErrorModal';

    export default {
        data() {
            return {
                errorArr: [],
                errorDialog: false,
            }
        },
        components: {
            CommonServices,
            ErrorModal
        },
        props: ['value', 'exportProps'],
        mixins: [CommonServices],
        methods: {
            exportToCSV() {
                if(this.exportProps.ids.length > 0) {
                    let idfilter = encodeURIComponent(JSON.stringify({id: this.exportProps.ids}));
                    this.exportProps.pagination.filter = idfilter.replace(/\\/g, '');
                }
                    this.$store.dispatch(this.exportProps.store+'/export',this.exportProps.pagination).then(response => {
                        if (response.error) {
                            this.errorArr = response.data.error;
                            this.errorDialog = true;
                        } else {
                            this.convertToCSV(this.exportProps.fileName, response.data)
                        }
                    }, error => {
                        this.errorArr = this.getModalAPIerrorMessage(error);
                        this.errorDialog = true;
                    });
            },
        },
        mounted() {
            this.errorMessage = '';
        }
    }
</script>
