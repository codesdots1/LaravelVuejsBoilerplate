import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import ExportBtn from "../../partials/ExportBtn";
import MultiDelete from "../../partials/MultiDelete";
import AddState from "./AddState.vue";
import {mapState} from "vuex";
import CommonServices from '../../common_services/common.js';
import Import from "../../partials/Import";

export default CustomTable.extend({
    name: "State",
    data: function () {
        var self = this;
        return {
            tab: 'tab1',
            isImportLoaded: false,
            modalOpen: false,
            addSateModal: false,
            urlApi: 'stateStore/getAll',// set store name here to set/get pagination data and for access of actions/mutation via custom table
            headers: [
                { text: 'State', value: 'name'},
                { text: 'Country', value: 'country.name'},
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            paramProps:{
                idProps: '',
                storeProps: '',
            },
            exportProps:{
                id: '',
                store: '',
                fileName: '',
                pagination: '',
            },
            importProps:{
                store: 'stateStore',
                modelName: 'state',
            },
            deleteProps:{
                ids: '',
                store: '',
            },
            confirmation:{
                title: '',
                description: '',
                btnCancelText: self.$getConst('BTN_CANCEL'),
                btnConfirmationText: self.$getConst('BTN_OK'),
            },
            country_id:'',
            filterMenu: false,
        }
    },
    mixins: [CommonServices],
    components: {
        DeleteModal,
        AddState,
        ExportBtn,
        MultiDelete,
        Import
    },
    computed: {
        ...mapState({
            setCountryList: state => state.countryStore.countryList,
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
            debugger
            let rowIds = [];
            this.selected.forEach((element, index) => {
                rowIds[index] = element.id;
            });

            this.exportProps.ids = rowIds;
            this.exportProps.store = 'stateStore';
            this.exportProps.fileName = 'State';
            this.exportProps.pagination = JSON.parse(JSON.stringify(this.pagination));
            this.$refs.exportbtn.exportToCSV();
        },
        /*
        * Add state Modal method
        * */
        addSate(){
            this.$store.dispatch("countryStore/getAll",{page:1,limit:5000}).then((response) => {
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = true;
                } else {
                    this.$store.commit('countryStore/setCountryList', response.data.data);
                    this.addSateModal = true;
                }
            }, error => {
                this.errorArr = this.getModalAPIerrorMessage(error);
                this.errorDialog = true;
            });
        },
        /*
        * Edit state Modal
        * */
        editItem(id){
            // set the edit id in store
            this.$store.commit('stateStore/setEditId', id);
            //get by id to open and edit the role of particular id
            this.$store.dispatch('stateStore/getById', id).then(response => {
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = true;
                } else {
                    this.$store.commit('stateStore/setModel', {model: response.data});
                    this.addSate();
                }
            }, error => {
                this.errorArr = this.getModalAPIerrorMessage(error);
                this.errorDialog = true;
            });
        },
        deleteItem (id) {
            this.paramProps.idProps = id;
            this.paramProps.storeProps = 'stateStore';
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
            this.deleteProps.store = 'stateStore';
            this.$refs.multipleDeleteBtn.deleteMulti();
        },
        /**
         * Filter
         */
        changeFilter(){
            let filter = {};
            if(this.country_id != ''){
                filter.country_id = [this.country_id];
            }
            this.filterModel =filter;
            this.refresh();
            this.filterMenu= false;
        },
        /**
         * Reset Filter
         */
        resetFilter(){
            this.country_id = '';
            this.changeFilter();
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
    mounted(){
        this.$store.dispatch("countryStore/getAll",{page:1,limit:5000}).then((response) => {
            if (response.error) {
                this.errorArr = response.data.error;
                this.errorDialog = true;
            } else {
                this.$store.commit('countryStore/setCountryList', response.data.data);
            }
        }, error => {
            this.errorArr = this.getModalAPIerrorMessage(error);
            this.errorDialog = true;
        });
    }
});
