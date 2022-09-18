import { useEffect, useState } from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import CustomForm from "./CustomForm"


const MailChimpSimpleForm = () => {
    const url =`https://gmail.us11.list-manage.com/subscribe/post?u=97e538ca74e56683546fc5d00&id=705d53f500`
    return(
        <div>
             <MailchimpSubscribe
              url={url}
              render={({ subscribe, status, message }) => (
                <CustomForm
                    status={status}
                    message={message}
                    onValidated={formData => subscribe(formData)}
                />
            )}
              />
        </div>
    )

}
export default MailChimpSimpleForm