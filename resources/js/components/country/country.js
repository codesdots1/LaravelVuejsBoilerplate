import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import ExportBtn from "../../partials/ExportBtn";
import AddCountry from "./AddCountry.vue";
import MultiDelete from "../../partials/MultiDelete";
import {mapState} from "vuex";
import CommonServices from '../../common_services/common.js';
import Import from "../../partials/Import";

export default CustomTable.extend({
    name: "Country",
    data: function () {
        var self = this;
        return {
            tab: 'tab1',
            isImportLoaded: false,
            files: [],
            modalOpen: false,
            addCountryModal: false,
            urlApi: 'countryStore/getAll',// set store name here to set/get pagination data and for access of actions/mutation via custom table
            headers: [
                { text: 'Country', value: 'name'},
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            paramProps:{
                idProps: '',
                storeProps: '',
            },
            deleteProps:{
                ids: '',
                store: '',
            },
            exportProps:{
                id: '',
                store: '',
                fileName: '',
                pagination: '',
            },
            importProps:{
                store: 'countryStore',
                modelName: 'country',
            },
            confirmation:{
                title: '',
                description: '',
                btnCancelText: self.$getConst('BTN_CANCEL'),
                btnConfirmationText: self.$getConst('BTN_OK'),
            },
        }
    },
    mixins: [CommonServices],
    components: {
        DeleteModal,
        AddCountry,
        ExportBtn,
        MultiDelete,
        Import
    },
    computed: {
        ...mapState({
            pagination : state => state.roleStore.pagination,
        })
    },
    watch: {
    },
    created () {
    },
    methods:{
        /**
         *
         */
        setExport(){
            let rowIds = [];
            this.selected.forEach((element, index) => {
                rowIds[index] = element.id;
            });

            this.exportProps.ids = rowIds;
            this.exportProps.store = 'countryStore';
            this.exportProps.fileName = 'Country';
            this.exportProps.pagination = JSON.parse(JSON.stringify(this.pagination));
            this.$refs.exportbtn.exportToCSV();
        },
        /*
        * Add Role Modal method
        * */
        addCountry(){
            this.addCountryModal = true;
        },
        /*
        * Edit Role Modal
        * */
        editItem(id){
            // set the edit id in store
            this.$store.commit('countryStore/setEditId', id);
            //get by id to open and edit the role of particular id
            this.$store.dispatch('countryStore/getById', id).then(response => {
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = true;
                } else {
                    this.$store.commit('countryStore/setModel', {model: response.data});
                    this.addCountryModal = true;
                }
            }, error => {
                this.errorArr = this.getModalAPIerrorMessage(error);
                this.errorDialog = true;
            });
        },
        deleteItem (id) {
            this.paramProps.idProps = id;
            this.paramProps.storeProps = 'countryStore';
            this.confirmation.title = this.$getConst('DELETE_TITLE');
            this.confirmation.description = this.$getConst('WARNING');
            this.modalOpen = true;
        },
        /**
         * Multiple Delete
         */
        multipleDelete(){
            let rowIds = [];
            this.selected.forEach((element, index) => {
                rowIds[index] = element.id;
            });

            this.deleteProps.ids = rowIds;
            this.deleteProps.store = 'countryStore';
            this.$refs.multipleDeleteBtn.deleteMulti();
        },
        refreshData(){
            var self = this;
            setTimeout(function () {
                if(self.tab == 'tab1') {
                    self.refresh();
                } else if(self.tab == 'tab2' && self.$refs.importdata) {
                    if(this.isImportLoaded) {
                        self.$refs.importdata.refreshImport();
                    }
                    this.isImportLoaded = true;
                }
            }, 100);
        },
    },
    mounted(){}
});
