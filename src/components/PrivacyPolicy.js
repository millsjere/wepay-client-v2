import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'


const useStyles = makeStyles(theme => ({
    justify: {
        textAlign: 'justify'
    }
}))

const PrivacyPolicy = () => {
    const classes = useStyles()

  return (
    <div>
        <Typography variant='h5' gutterBottom><b>Privacy Notice for Consumers</b></Typography>
        <Typography paragraph className={classes.justify}>
            Your trust and confidence in how we collect, use, and share information about you is a priority. 
            This Privacy Notice for Consumers (Notice) applies to all our website users. Websites, our mobile 
            applications (WEPAY apps), e-mail, our branded social media sites or pages, and other online, mobile 
            or retail services that link to or from or expressly reference this Notice as well as any interactions 
            you may have with our digital advertising campaigns (collectively, the Sites/Services). 
        </Typography>
        <Typography paragraph className={classes.justify}>
            This Notice explains how we collect, share, use, and protect information when you visit or use the Sites/Services. 
            We advise you to read the Notice in its entirety, including the jurisdiction-specific provisions in the appendix 
            to this Notice, which will apply to all users. By using the Sites/Services, you agree to this Privacy Notice.
        </Typography>
        <Typography paragraph className={classes.justify}>
            As you review this Notice, here are a few important things to keep in mind:<br/><br/>
            <li>If you have a financial product or service with us for personal, family or household use. Our business would also have delivered to you a Customer Privacy Notice (Customer Privacy Notice) that explains how our business collects, uses and shares information about you, and offers you certain choices with respect to the use and sharing of your personal information</li>
            <li>This Site is not intended for children under 13 years of age. We do not knowingly solicit information from, or market to, children under 13 years of age.</li>
            <li>Wireless service providers, Internet service providers, device manufacturers and/or social media platforms may have their own privacy notices that are different from this one for the information they may access through your use of the Sites. We encourage you to read their privacy notices, uses and sharing of information by those third parties may be different from WEPAY.</li>
            <li>Our mobile, social media, or other services, sites, pages or materials may have additional terms about the privacy or use of your information. Please review the privacy notice for the specific Site/Service you are using.</li>
      </Typography>

      <Typography variant='h5' gutterBottom style={{marginTop: '2rem'}}><b> I. INFORMATION WE COLLECT THROUGH THE SITES/SERVICES</b></Typography>
      <Typography paragraph className={classes.justify}>
            We collect two types of information: Personal Information and Other Information. Personal Information is any information:<br /><br/>
            <li>that identifies or can be used to identify you or your household;</li>
            <li>that relates to, describes, is capable of being associated with, or could reasonably be linked (directly or indirectly) with you or your household;</li>
            <li>that can be used to authenticate you or provide access to an account; </li>
            <li>that relates to you and that might be sensitive (such as personal medical or health information, account number, account value). </li>
        </Typography>

        <Typography paragraph className={classes.justify}>
            Other Information is information that does not and cannot reveal an individual's specific identity, such as information that has been de-identified or aggregated. This Other Information is described in more detail in the Use of Information section below.
        </Typography>

        <Typography variant='h6'> For at least the past 12 months, we have collected the following categories of Personal Information from the following sources:</Typography><br/>
        <Typography paragraph className={classes.justify}>
            <b>What we collect:</b> We collect from you (which, for the purposes of this section, refers to you and your household) through the Sites/Services Personal Information that identifies you as an individual or relates to identifying information about you, including identifiers such as your name, addresses, phone number, and e-mail.
        </Typography>
        <Typography paragraph className={classes.justify}>
            Depending upon the Services you request, we may collect additional Personal Information such 
            as: alias; mother's maiden name; gender; race; age; date of birth; information from a birth certificate or 
            death certificate; relationship status; Social Security Number, Staff ID number; information that appears on 
            your Driver's license , National ID, or Passport or your Resident permit and Police clearance report; Tax ID, 
            bank account and/or payment card information; information about your education, employment and employment history, and 
            property; criminal offenses; credit history; credit report; dependent/beneficiary name(s); biometric information; and other personal identification numbers
        </Typography>
        <Typography paragraph className={classes.justify}>
            We, or companies we work with, collect from you: other Internet or other electronic network activity information such 
            as browser and device information; usage data through WEPAY mobile apps; information collected through cookies, web beacons 
            and other technologies; demographic information; applications you submit; and aggregated information about your visits to, or 
            use of, our Sites/Services. While that information alone may not reveal your specific individual identity, we may associate this
             usage and Other Information we collect with Personal Information about you
        </Typography>
        <Typography paragraph className={classes.justify}>
            If you have a WEPAY account, we also collect and maintain account and transaction information including: your user ID; 
            account holder name; account PIN and password; security question(s) and word(s); signature; assets in the account; bank 
            SWIFT code; credit card PIN; loyalty program information (when applicable); merchant name and contact information; merchant 
            category code; transaction data/history; your photo (when provided); image documentation; and your voice recordings (when provided).
             We also collect from third parties account identifiers used in transfers of funds.
        </Typography>
        <Typography paragraph className={classes.justify}>
            <b>Our business purpose for collecting this information:</b> reviewing and processing applications for our Services; intake of new customers; 
            account maintenance and servicing; providing customer service; improving our Sites/Services; performing research and business analytics, and 
            identifying usage trends; engaging in fraud monitoring and prevention; compliance with applicable laws and regulations; protecting our business 
            and our customers against illegal activity; performing audits; verifying requests made pursuant to this Notice; tailoring marketing communications 
            from our affiliates as well as from selected third parties; managing our business effectively; and developing new products and services. 
        </Typography>
        <Typography paragraph className={classes.justify}>
            <b>What we collect:</b> Certain information is collected from you by Internet browsers or automatically through your device, such as your
             Media Access Control (MAC) address, computer type (Windows or Mac), screen resolution, operating system name and version, device manufacturer 
             and model, language, and Internet browser type and version. We may also collect from you various attributes associated with your device 
            (such as IP address, installed fonts, language and browser settings, and time zone) 
            in order to create a device fingerprint or identifier so that we can recognize your device, 
            along with the time of your visit and the page(s) visited.
        </Typography>
        <Typography paragraph className={classes.justify}>
            <b>Our business purpose for collecting this information:</b> reviewing and processing applications for our Services; intake of new customers; account maintenance and servicing; providing customer service; improving our Sites/Services; performing research and business analytics, and identifying usage trends; engaging in fraud monitoring and prevention; compliance with applicable laws and regulations; protecting our business and our customers against illegal activity; performing audits; verifying requests made pursuant to this Notice; tailoring marketing communications from our affiliates as well as from selected third parties; managing our business effectively; and developing new products and services
        </Typography>

        <Typography variant='h5' gutterBottom style={{marginTop: '2rem'}}><b>II. USE OF INFORMATION</b></Typography>
        <Typography paragraph className={classes.justify}>
            We use the Personal Information and Other Information we collect from and about you to:<br/><br/>
            <li>Authenticate you so that you can access the Sites and conduct account transactions on the Sites;</li>
            <li>Recognize you, your device or your browser when you use the Sites/Services so that we can facilitate navigation, display information more effectively, store your preferences and otherwise personalize your experience and enhance the use of the Sites;</li>
            <li>Process your applications and transactions;</li>
            <li>Respond to your inquiries, fulfill requests and request your feedback;</li>
            <li>Service your account and market to you, including advertisements and other communications tailored to you, on our Sites/Services and third party sites, as well as offline (please see the Online Advertising section for more information on our online advertising practices);</li>
            <li>To track responses to our e-mails and advertisements and to measure the success of our marketing campaigns;</li>
            <li>Provide you with account information, as well as information regarding our branches and branch events;</li>
            <li>Facilitate social sharing functionality, where appropriate;</li>
            <li>For our business purpose and other lawful purposes, such as for data analysis, audits, fraud monitoring and prevention, information security, improving the Sites, developing new products and services, managing our business effectively, identifying usage trends, and expanding our business activities;</li>
            <li>Review statistical information about use of the Sites in order to improve their design and functionality, to understand how they are used, and to assist us with resolving questions about the Sites; and</li>
            <li>Ensure that the Sites function properly and otherwise administer the Sites.</li>
            <br/>
            We may use, or share with others (in anonymous or non-readable form where appropriate) your information in order to better recognize you when visiting the Site and to provide relevant advertising (for WEPAY or third party's products/services), based on your interests, on the Site, on other sites and apps and other channels including television, email and direct mail.
        </Typography>

        <Typography variant='h5' gutterBottom style={{marginTop: '2rem'}}><b>III. SHARING OF PERSONAL INFORMATION</b></Typography>
        <Typography paragraph className={classes.justify}>
            During at least the past 12 months, we have disclosed your Personal Information for the following business purposes:<br/><br/>
            <li>with our affiliates to the extent permissible under applicable law;</li>
            <li>with third parties, to permit them to send you marketing communications on our behalf;</li>
            <li>with our service providers, who provide services such as website hosting, data analysis, information technology and related infrastructure provision, customer service, processing your transactions, e-mail delivery, auditing, and other services;</li>
            <li>with individuals you associate with your social media account and to your social media account provider, in connection with your social sharing activity; and</li>
            <li>with a third party in the event of any proposed reorganization, merger, sale, joint venture, assignment, transfer, or other disposition of all or any portion of our business, assets, or stock (including in connection with any bankruptcy or similar proceedings).</li>

            <br/>
            We also may use and disclose your Personal Information as we believe to be necessary or appropriate: (a) under applicable law, which may include laws outside your country of residence; (b) to respond to requests from courts, law enforcement agencies, regulatory agencies, and other public and government authorities, which may include such authorities outside your country of residence; (c) to enforce our terms and conditions; and (d) to protect our rights, privacy, safety, or property, and/or that of our affiliates, you, or others.
            <br/><br/>
            Where appropriate, we will limit sharing of your Personal Information in accordance with the choices you have provided us in response to our Customer Privacy Notice(s) or other privacy choices that we may make available.
            <br/><br/>
            We may share de-identified or aggregated information with third parties to help deliver products, services, and content that are tailored to the users of our Sites and for other business purposes.
            <br/><br/>
            We may transfer information to WEPAY affiliated companies or other parties throughout the world to process transactions and provide you with products and services. Regardless of where we process your information, we still treat it in accordance with this Notice and applicable law.

        </Typography>

        <Typography variant='h5' gutterBottom style={{marginTop: '2rem'}}><b>IV. ONLINE ADVERTISING</b></Typography>
        <Typography paragraph className={classes.justify}>
                We may, directly or through third parties, serve ads regarding products and services intended to be of interest to you on the Site and on third party sites or apps. We and others may use the online technologies described in the Use of Information section above to make inferences and predictions about your characteristics, interests and preferences based on your online interests and activities across other sites. We may also use technologies to associate and recognize your various mobile and desktop devices in order to deliver ads and other content in a consistent manner across the devices you use. Information we collect using the technologies described above may also be associated or linked with Personal Information, such as email or postal address, you provided directly to us or others. Alternatively, Personal Information may also be linked with characteristics or attributes about you, such as lifestyle interests, in support of our marketing efforts
        </Typography>

        <Typography variant='h5' gutterBottom style={{marginTop: '2rem'}}><b>V. YOUR CHOICES REGARDING YOUR PERSONAL INFORMATION</b></Typography>
        <Typography paragraph className={classes.justify}>
            You have certain rights with regard to your Personal Information.<br/><br/>

            <h4>A. Cookies and Interest-Based Advertising.</h4>
            Both the Network Advertising Initiative and the Digital Advertising Alliance (to whose principles we adhere) provide information about and technologies to opt-out of receiving some or all interest based advertising. You can also opt-out of interest based advertising by clicking on the appropriate icon within an interest based ad which will take you to tools to help you manage these choices. These technologies are browser and device specific, they must be adopted on each device you use. If you block or clear cookies, these technologies may not work. You will continue to see ads on the Site which reflect how you use the Site and our Services.
            <br/><br/>
            You can choose whether to accept cookies through your browser settings (check the Help file). For example, most browsers allow you to automatically decline cookies or decline or accept a particular cookie (or cookies) from a particular site when browsing. If you decide not to accept cookies, some features of the Site may not work properly because we may not be able to recognize your device and associate you with your WEPAY account(s). In addition, the offers or content we provide when you visit our site or on third party sites may not be as relevant to you or tailored to your interests.
            <br/><br/>
            <h4>B. Local Shared Objects.</h4>
            Local Shared Objects, sometimes referred to as flash cookies may be stored on your hard drive using a media player or other software installed on your device. Local Shared Objects are similar to cookies in terms of their operation, but may not be managed in your browser in the same way. Restricting acceptance of Local Shared objects may impede the functionality of some Flash applications, including those used in connection with the Site including animation and video presentations. For more information on managing Local Shared Objects, <a href='/'>click here</a>. Similarly, certain authentication features of the WEPAY apps may set a persistent token, similar to a cookie, on your mobile device. This token allows that device to be uniquely associated or bound with your account. This token will remain on your device until you un-enroll from those features or delete the app from your device.
            <br/><br/>
            <h4>C. Do Not Track.</h4>
            Some browsers have a do not track feature that lets you tell websites that you do not want to have your online activities tracked. At this time, we do not respond to browser do not track signals
        </Typography>

        <Typography variant='h5' gutterBottom style={{marginTop: '2rem'}}><b>VI. UPDATING YOUR PERSONAL INFORMATION</b></Typography>
        <Typography paragraph className={classes.justify}>
             Keeping your account information accurate and up to date is very important. If your account information is incomplete, inaccurate or not current, please use the Contact Us option on our Site, or call or write to us at the telephone numbers or appropriate address for changes listed on your account statements, records, online or other account materials. You can also speak to a branch representative, your financial advisor or your designated account representative.
        </Typography>

        <Typography variant='h5' gutterBottom style={{marginTop: '2rem'}}><b>VII. SECURITY OF PERSONAL INFORMATION</b></Typography>
        <Typography paragraph className={classes.justify}>
             The security of your Personal Information is a priority. We seek to protect this information by implementing and maintaining reasonable physical, electronic, and procedural security measures and safeguards designed to protect Personal Information within our organization. We provide employee training in the proper handling of Personal Information. Unfortunately, no data transmission over the Internet or wireless network or data storage system can be guaranteed to be 100% secure. If you have reason to believe that your interaction with us is no longer secure (for example, if you feel that the security of any account you might have with us has been compromised), please immediately contact us in accordance with the Contact Us section below.
        </Typography>

        <Typography variant='h5' gutterBottom style={{marginTop: '2rem'}}><b>VIII. OTHER IMPORTANT INFORMATION</b></Typography>
        <Typography paragraph className={classes.justify}>
            <h4>A. Notice of Changes</h4>
            We may change this Notice from time to time. Please take a look at the Last Updated legend at the beginning of this Notice to see when this Privacy Notice was last revised. When we do, we will post the revised Notice on this page with a new effective date. Any changes will become effective when we post the revised Notice on the Site. Your use of the Sites/Services following these changes means that you accept the revised Notice.
            <br/><br/>
            <h4>B. Third-Party Sites and Services.</h4>
            This Notice does not address, and we are not responsible for, the privacy, security, or other practices of any third parties, including any third party operating any site or service to which the Site links. The inclusion of a link on the Site does not imply endorsement of the linked site or service by us or by our affiliates.
            <br/><br/>
            In addition, we are not responsible for the information collection, usage, disclosure, or security policies or practices of other organizations, such as Facebook, Apple, Google, Microsoft, or any other third-party app provider, social media platform provider, operating system provider, device manufacturer, or wireless service provider, including with respect to any Personal Information you disclose to other organizations through or in connection with the Site/Services.
            <br/><br/>
            <h4>C. Jurisdictional Issues</h4>
            The Site is controlled and operated by us from the Republic of Ghana and are not intended to subject us to the laws or jurisdiction of any state, country, or territory other than those of the Republic of Ghana. Information about you may be stored and processed in any country where we have facilities or in which we engage service providers, and, by using the Site, you consent to the transfer of information to countries outside of your country of residence, including the Republic of Ghana, which may have data protection rules that are different from those of your country. In certain circumstances, courts, law enforcement agencies, regulatory agencies, or security authorities in those other countries may be entitled to access your Personal Information.
        </Typography>
    </div>
  )
}

export default PrivacyPolicy