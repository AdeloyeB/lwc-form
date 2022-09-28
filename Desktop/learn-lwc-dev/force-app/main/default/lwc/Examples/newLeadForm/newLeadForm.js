import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import LEAD_OBJECT from '@salesforce/schema/Lead';
import FIRSTNAME_FIELD from '@salesforce/schema/Lead.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Lead.LastName';
import EMAIL_FIELD from '@salesforce/schema/Lead.Email';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';

export default class NewLeadForm extends LightningElement {
    leadId;
    firstName = "";
    lastName = "";
    email = "";
    phone = "";
    company = "";

    handleChange(event) {
        this.leadId = undefined;
        if(event.target.name == "firstname"){
            this.firstName = event.target.value;
        }

        if(event.target.name == "lastname"){
            this.lastName = event.target.value;
        }

        if(event.target.name == "company"){
            this.company = event.target.value;
        }

        if(event.target.name == "email"){
            this.email = event.target.value;
        }

        if(event.target.name == "phone"){
            this.phone = event.target.value;
        }

    }



    handleSubmit(event) {

        event.preventDefault();

        const fields = {};
        fields[FIRSTNAME_FIELD.fieldApiName] = this.firstName;
        fields[LASTNAME_FIELD.fieldApiName] = this.lastName;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[COMPANY_FIELD.fieldApiName] = this.company;
        const recordInput = { apiName: LEAD_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then((lead) => {
                console.log(JSON.stringify(recordInput));
                console.log(JSON.stringify(lead))
                this.leadId = lead.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Lead created '+ this.firstName + " " + this.lastName,
                        variant: 'success'
                    })
                );
                
            })
            .catch((error) => {
                console.log(error + JSON.stringify(recordInput));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: "Lead has not been created ",
                        variant: 'error'
                    })
                );
            });
    }

}