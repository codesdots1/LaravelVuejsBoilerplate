/*//https://stackoverflow.com/questions/42662144/how-could-i-use-const-in-vue-template
//https://dev.to/nkoik/writing-a-very-simple-plugin-in-vuejs---example-8g8*/
import {PERMISSION_CONSTANTS} from './permission/permission-constants'
const YOUR_CONSTS = {
    DATE_CONST: 'DD/MM/YYYY',
    TIME_CONST: 'hh:mm A',
    DATE_TIME_CONST: 'DD/MM/YYYY hh:mm A',
    CREATE_ACTION: 'Inserted Successfully',
    UPDATE_ACTION: 'Edited Successfully',
    DELETE_ACTION: "Deleted Successfully",

    REGISTER_SUCCESS: "Sucessfully registered. Please check your email for Verification",
    BTN_CANCEL: 'Cancel',
    BTN_SUBMIT: 'Submit',
    BTN_UPDATE: 'Update',
    BTN_OK: 'Ok',
    DELETE_TITLE: 'Delete Confirmation',
    UPLOAD_CSV: 'CSV uploaded successfully',
    DOWNLOAD_SAMPLE_CSV: 'Sample CSV downloaded successfully',
    ROLE_TITLE: 'Add Role',
    ROLE_DESC: 'Please Enter Your Role',
    WARNING: 'Are you sure you want to delete this record?',
    EMAIL_SEND_MESSAGE: 'Email sent successfully',
    RESET_PASSWORD: 'Password reset successfully',
    CHANGED_PASSWORD: 'Password changed successfully',
    NOIMAGE: 'No Image Found',
    TXT_UPDATE: 'Update',
    TXT_ADD: 'Add',
    TXT_CREATE: 'Create',


    ...PERMISSION_CONSTANTS,

};

export default {
    install(Vue, options) {
        Vue.prototype.$getConst = (key) => {
            return YOUR_CONSTS[key]
        }
    }
}
