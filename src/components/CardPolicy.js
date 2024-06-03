import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'


const useStyles = makeStyles(theme => ({
    justify: {
        textAlign: 'justify'
    }
}))

const CardPolicy = () => {
    const classes = useStyles()


  return (
        <div>
            <Typography paragraph className={classes.justify}>
                By using your FORBES WEPAY Card you unconditionally agree to be bound by the laws, rules, 
                regulations and official issuances applicable on the matter, now existing or which may 
                hereinafter be enacted, issued or enforced. All the Terms and Conditions in the FORBES' 
                WEPAY Card Agreement have been read and understood by you as evidenced by your signature 
                on the application form of the FORBES WEPAY Card. In this agreement, “we”, “us" 'our” and 
                “Bank” mean FORBES microfinance and "you” and "your" mean the customer and include 
                (where appropriate) any person the customer has instructed us to give a Card to. 
                "Bank" means FORBES microfinance (Ghana) Limited. "Card" means a FORBES WEPAY Card, 
                including any renewal or replacement Card. 
            </Typography>
            <Typography paragraph className={classes.justify}>
                "Cardholder" means the person having power alone to operate the account in accordance with 
                the our mandate in respect thereof. "PIN" means the personal identification number issued 
                to the Cardholder from time to time for use with the Card. "Transaction" means any cash 
                withdrawal or payment made using the Card, or any refund arising in connection with the 
                use of the Card in any authorized manner for debit or credit to the Account. 
                
                CHARGES: The Cardholder shall be charged fees by FORBES Bank from time to time, 
                in accordance with the Bank's schedule of fees in force. 
            </Typography>
            <Typography paragraph className={classes.justify}>
            <strong>LIMITING YOUR RIGHT TO USE THE CARD:</strong> If we have good reason, we may or Refuse to approve a 
                transaction or Cancel or suspend your right to use the Card for any or all purposes or refuse 
                to replace any Card without prior notice to you. We will not be liable to you for refusal on 
                your part to approve a transaction, if you cannot use the Card for a transaction, or for any 
                loss or damages you may suffer as a result of the above. 

                </Typography>
            <Typography paragraph className={classes.justify}>
                <strong>SECURITY:</strong> You should do all that you reasonably can to keep the Card safe and your PIN confidential at all times. 
                You must also keep the Card separately from any cheques. You should never write down or record your PIN. 
                You should only reveal your Card number to make a transaction or the last four digits to report the loss or 
                theft of the Card or otherwise with our permission only if we allow you to do so.
            
            </Typography>
            <Typography paragraph className={classes.justify}>
            <strong>WHEN TO NOTIFY US:</strong> You notify us as soon as reasonably possible if: a) The Card gets lost or stolen or you 
                think that the Card may be misused or that someone else may have found out the PIN. b) Your statement 
                includes an item which you think is wrong. c) You change your name or address. You can contact us at 
                any of our branches during business hours or at FORBES Bank (Ghana) limited (Head Office) 
                (+ 233·………………….. or…………………). You will be required to confirm to us in writing within seven days any 
                verbal information which you have not already given us in writing.
            </Typography>
            <Typography paragraph className={classes.justify}>
                You must give us all the information you have about the loss, theft or misuse of the Card or the PIN, 
                and any other information we may require. We may give the police any information we think will be useful. 
                If you find the Card(s) which you have reported as lost, stolen or at risk of misuse, you must not use them. 
                You must cut them, in half and report them to us immediately. 
            </Typography>
            <Typography paragraph className={classes.justify}>
                <strong>LIMITS OF LIABILITY:</strong> If someone uses a Card obtained from you with your permission, you will be liable for 
                all the transaction's which took place prior to you notifying us that there is a danger of the Card being misused. 
                If we are unable to debit your account because the account has been c1osed, or for any other reason beyond our control, 
                you will still be liable to pay us for all transactions. We will not be liable to you if we cannot carry out responsibilities 
                under this agreement as a result of anything that we cannot reasonably control. This includes any machine failing to work and industrial disputes. 
            </Typography>
            <Typography paragraph className={classes.justify}>
                <strong>REFUNDS AND CLAIMS:</strong> We will credit your account with a refund for a transaction if the retailer asks us to or if you notify 
                us that a transaction with a retailer has been incorrectly debited to your account. You cannot use a claim you may have against 
                someone else to make a claim against us, or refuse to pay us, unless you have a legal right not to do so. 
                You cannot transfer any rights against us to anyone else. 
            </Typography>
            <Typography paragraph className={classes.justify}>
                <strong>CHANGING THE TERMS OF AGREEMENT:</strong> We may change the terms of agreement, including our charges if we add extra functions to the 
                Card at any time, upon notification to you about the change. Changes will normally arise from changes in the market conditions, 
                changes in the cost of providing the service to you, changes in legal or other requirements affecting us or for any other good reason. 
                We may introduce a charge for any service provided under or in connection with this agreement. We will notify you about any changes by: 
                advertising in the press; putting messages in your statements; sending you a separate written notice. Most changes will be implemented 
                at least 28 days after we notify you, to give you ample time to consider and decide if you wish to continue with the service. 
            </Typography>
            <Typography paragraph className={classes.justify}>
                <strong>ENDING THIS AGREEMENT:</strong> This agreement will come to on end if either of us gives a written notice to the other to that effect, 
                and you have returned all Cards and made all payments due under this agreement. We may give you replacement Cards from time 
                to time until this agreement ends.
            </Typography>
            <Typography paragraph className={classes.justify}>
                <strong>GENERAL:</strong> We do not warrant that services and benefits which we provide outside the terms of this agreement will always be available. 
                We may reserve the right to withdraw or vary these services or benefits at any time without giving you notice. 
                We will charge you for any losses or costs we have to pay if you breach this agreement. This agreement is governed by the Ghanaian law.
            </Typography>
        </div>
  )
}

export default CardPolicy