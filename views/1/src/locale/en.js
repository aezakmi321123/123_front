export default {
  required: 'this field is required',
  captcha: 'Captcha is required',
  btns: {
    submit: 'Submit',
    cancel: 'Cancel',
    update: 'Update',
  },
  header: {
    news: 'News',
    homepage: 'Homepage',
    exchange: 'Exchange',
    top_directions: 'Top Directions',
    about_us: 'About Us',
    signin: 'Sign In',
    signup: 'Sign Up',
    settings: 'Settings',
    history: 'History',
    logout: 'Logout',
    verified: 'Email Verified',
    no_verified: 'Email Not Verified',
    wallet: 'Wallet',
    terms: 'Terms of Use',
    privacy: 'Privacy',
  },
  footer: {
    settings: 'Settings',
    history: 'History',
    main: 'Main',
    stacking: 'Stacking',
    exchange: 'Exchange',
    wallet: 'Wallet',
    about_us: 'About us',
    terms: 'Terms of use',
    privacy: 'Privacy',
    telegram: 'Telegram',
  },
  exchangeConfirm: {
    title: 'You have pending exchange',
    content:
      'You have pending exhchange {coinFrom} - {coinTo}. Do you want to continue?',
    notEnoughError: 'Not enough coins, please deposit!',
  },
  main: {
    label: `${import.meta.env.VITE_BASE_EXCHANGE_NAME} Cryptocurrency Exchange`,
    features: `Features of ${import.meta.env.VITE_BASE_EXCHANGE_NAME}`,
    label_p: `${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } is a reliable and secure cryptocurrency exchange for everyone`,
    optimal_exchange: 'Optimal exchange',
    best_offers: 'Best offers on the market.',
    time_tested: 'Time-tested reliability',
    confidence: 'Make your exchanges with confidence.',
    save_money: `${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } - saving money, easy`,
    improve: 'Improve the performance of your investments.',
    delay: 'Exchange without delay',
    prompt: 'Prompt processing of your orders.',
    potential: 'Unlimited potential',
    potential_p: `The crypto industry has come a long way and has become a
    significant global economic segment. From the very beginning of
    its existence, it has revolutionized the financial sphere:
    — launched the process of decentralization,
    — showed how secure and anonymous it could be,
    — opened up new opportunities for instant and inexpensive international money transfers.\n
    With global accessibility, low transaction fees, and fast settlement times, cryptocurrency can facilitate cross-border payments and financial inclusion of unbanked users.\n
    Our experience suggests that cryptocurrencies’ growth and distribution potential will continue to fascinate and attract more and more new users
    `,
    partners: 'Our partners',
    send: 'You send',
    receive: 'You receive',
    exchange: 'Exchange',
    top_markets: 'Your access to the top coin markets',
    capitalize:
      'Capitalize on trends and trade with confidence through our expansive marketplace listings.',
    wallet: 'Wallet',
  },
  signin: {
    login: 'Partner login',
    new_user: 'New user?',
    create: 'Create an account',
    password: 'Password',
    sign_in: 'Sign in',
    forgot: 'Forgot passport',
  },
  sign_up: {
    register: 'Partner register',
    have_acc: 'Already have account?',
    login: ' Log in',
    full_name: 'Full name',
    sign_up: 'Sign up',
    password: 'Password',
  },
  settings: {
    title: 'User Settings',
    name: 'Full Name',
    city: 'City',
    country: 'Country',
    phone: 'Phone',
    update: 'Update',
    confirmed: 'Email Confirmed',
    confirm_btn: 'Confirm Email',
  },
  payment: {
    back: 'Back',
    title: 'Payment details',
    description:
      'Send the exact amount to the specified address. After payment has been made, you will be navigated back or see success modal',
    cryptoAmount: 'Full Amount',
    totalAmountReceived: 'Amount Received',
    walletAddress: 'Wallet Address',
    receivedAddress: 'Received Address',
    networkFrom: 'Network From',
    networkTo: 'Network To',
    copied: 'Copied',
    error: 'Something went wrong, try again later!',
    paymentInfo: 'Payment Info',
    domain: 'Domain:',
    paymentNumber: 'Payment ID:',
    totalSend: 'Total to Send:',
    totalReceive: 'Total to Receive:',
    toPay: 'To Pay:',
    commission: 'Commission:',
    invoiceExpiresIn: 'Invoice Expires In:',
    expired: 'expired',
    status: 'Status:',
    rejectedPaymentTitle: 'Payment Timeout: Action Required',
    rejectedPaymentDescription:
      "Oops! Your payment attempt has hit a time snag. Time has expired, and the transaction couldn't go through. No worries, though – a quick chat with our support team will get things back on track. Reach out to us, and we'll ensure your payment sails smoothly through the waves of technical troubles. Let's resolve this together!",
    successPaymentTitle: 'Payment Succeed',
    successPaymentDescription:
      'Thank you for your payment. Your transaction was successful, and your order has been confirmed. If you have any questions or concerns, please contact our customer support.',
  },
  ui: {
    copyableInput: {
      tooltip: 'copy',
    },
  },
  success: 'success',
  apiErrors: {
    common: 'Something went wrong!',
  },
  wallets: {
    search: 'Search wallets..',
    hide_zero: 'Hide zero balances',
    name: 'Name',
    qty: 'QTY (usd)',
    change: '24H %',
    rate: 'Rate',
    direction: 'Direction',
    currency: 'Currency:',
    deposit: 'Amount to deposit:',
    get_address: 'Get Address',
    withdraw: 'Withdraw',
    dep: 'Deposit',
    w_amount: 'Amount to withdraw:',
    a_withdraw: 'Address to withdraw:',
    total_balance: 'Total balance:',
    fee: 'Display amount with fee: {fee}.',
    feeAmount: 'Fee: {fee}',
    sending: 'I’m sending:',
    receive: 'I’ll receive:',
    withdrawSuccess:
      "Congratulations! Your withdrawal order has been successfully attached. We understand the importance of your request, and we're working diligently to process it promptly.  If you encounter any unexpected challenges or have questions, our dedicated support team is here to assist you.",
    incorrectAddress: 'Incorrect address',
  },
  exchange: {
    success: 'Successfully exchanged',
    sameCoins: 'Chose same coins',
    card: {
      balance: 'balance',
      qty: 'qty',
      price: 'price',
      change: '24h Change',
      volume: '24h Volume',
    },
    mainCard: {
      makeExchange: 'Make Exchange',
      exchangeRate: 'Exchange rate',
      ourCommission: 'Our commission',
      with: 'With Account',
      without: 'Without Account',
      tooltip:
        'You are not currently logged in.\n' +
        'You have two options to make an exchange:\n' +
        '1. You can create an account or sign in existing and in this case the money will be credited to your account\n' +
        '2. You can make an exchange without an account by indicating the details of where you want to receive your money',
      addressPlaceholder: 'Receiving Address or card',
    },
  },
  terms: `
    <p>
    This summary of our Terms of Service offers you an overview of the key terms that apply to your use of our website and trading services. While we hope this summary section is helpful, you should read the complete Terms of Service below since they provide important information about how our services work. Please note that we refer to our online service where you can execute trades as "${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    }".
    </p>\n
    <h2>Eligibility and Acceptable Use</h2>\n
    <p>
    You must meet certain eligibility criteria to use ${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    }. For instance, you must be an adult and there are certain locations from which you may not be able to use some or all of ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  }. Additionally, there are certain things you cannot do when using ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  }, such as engage in illegal activities, lie, or do anything that would cause damage to our services or systems. Please see the acceptable use section for more details.
    </p>\n
    <h2>Trading Risks</h2>\n
    <p>
    Engaging in trades may be risky, especially if you engage in any margin trades or use any other sophisticated trading options. Please don't use ${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } or any of the trading options if you do not understand these risks.
    </p>\n
    <h2>1. Key Definition</h2>\n
    <p>
    Capitalized terms not otherwise defined in these Terms will have the following meaning:\n
    1.1. "External Account" means any Financial Account or Digital Asset Account: (i) from which you may load Funds into your ${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } Account, and (ii) to which you may push Funds from your ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Account.\n
    1.2. "Financial Account" means any financial account of which you are the beneficial owner that is maintained by a third party outside of the Services, including, but not limited to third-party payment service accounts or accounts maintained by third party financial institutions.\n
    1.3. "Funds" means Digital Asset and/or Legal Tender.\n
    1.4. "Legal Tender" means any national currency, such as U.S. dollars, that may be used in connection with a purchase or sale of Digital Assets via the Services, and does not include any Digital Asset.\n
    1.5. "${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } Account" means a user account accessible via the Services where Funds may be stored by Payward on behalf of a user.\n
    1.6. "Digital Asset" means bitcoins, eth and other digital assets that may be purchased, sold or traded via the Services.\n
    </p>\n
    <h2>2. Eligibility</h2>\n
    <p>
    You further represent and warrant that you: (a) are of legal age to form a binding contract (at least 18 years old in the U.S.); (b) have not previously been suspended or removed from using our Services; (c) have full power and authority to enter into this agreement and in doing so will not violate any other agreement to which you are a party; (d) are not located in, under the control of, or a national or resident of (i) any Restricted Locations, not a resident of any country with high-risk status (Iran, Iraque, Russia, Ethiopia) (Rule 4.1) or (ii) any country to which the United States has embargoed goods or services; (e) are not identified as a "Specially Designated National;" (f) are not placed on the Commerce Departmentʼs Denied Persons List; and (g) will not use our Services if any applicable laws in your country prohibit you from doing so in accordance with these Terms.
    </p>\n
    <h2>3. ${import.meta.env.VITE_BASE_EXCHANGE_NAME} Account</h2>\n
    <p>
    Capitalized terms not otherwise defined in these Terms will have the following meaning: Number of ${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } Accounts. Payward may, in its sole discretion, limit the number of ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Accounts that you may hold, maintain or acquire. ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Account information and security. In order to engage in any trades via the Services, you must create a ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Account and provide any requested information. When you create a ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Account, you agree to: (a) create a strong password that you do not use for any other website or online service; (b) provide accurate and truthful information; (c) maintain and promptly update your ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Account information; (d) maintain the security of your ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Account by protecting your password and restricting access to your ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Account; (e) promptly notify us if you discover or otherwise suspect any security breaches related to your ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Account; and (f) Users with balance more then 0.3 BTC must activate premium status. (g) take responsibility for all activities that occur under your ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Account and accept all risks of any authorized or unauthorized access to your ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Account, to the maximum extent permitted by law.
    </p>\n
    <h2>4. General Obligations</h2>\n
    <p>
    This Section 4 applies to: all trades completed via the Services\n
    4.1. Conditions and Restrictions. We may, at any time and in our sole discretion, refuse any trade submitted via the Services, impose limits on the trade amount permitted via the Services or impose any other conditions or restrictions upon your use of the Services without prior notice. For example, we may limit the number of open orders that you may establish via the Services or we may restrict trades from certain locations. Accuracy of Information. You must provide any information required when creating a ${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } Account or when prompted by any screen displayed within the Services. You represent and warrant that any information you provide via the Services is accurate and complete. Insurances and terminations. You must top-up the related with your ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } account address counting the fee. This obligation is required for citizens of the countries with high risk-score (Iraque, Iran, Russia, Pakistan and the CIS countries, and also to some EU countries).\n
    4.2. Taxes. It is your responsibility to determine what, if any, taxes apply to the trades you complete via the Services, and it is your responsibility to report and remit the correct tax to the appropriate tax authority. You agree that Payward is not responsible for determining whether taxes apply to your trades or for collecting, reporting, withholding or remitting any taxes arising from any trades.\n
    </p>\n
    <h2>5. Risk Disclosure</h2>\n
    <p>
    5.1. Trading risks. You acknowledge and agree that you shall access and use the Services at your own risk. The risk of loss in trading Digital Asset pairs and Digital Asset and Legal Tender pairs can be substantial. You should, therefore, carefully consider whether such trading is suitable for you in light of your circumstances and financial resources. You should be aware of the following points:\n
    5.2. You may sustain a total loss of the Funds in your ${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } Account, and, in some cases, you may incur losses beyond such Funds. If the market moves against your position, you may be called upon by us to provide a substantial amount of additional margin Funds, on short notice, in order to maintain your position. If you do not provide the required Funds within the time required by us, your position may be liquidated at a loss, and you will be liable for any resulting deficit in your ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Account.\n
    5.3. Under certain market conditions, you may find it difficult or impossible to liquidate a position. This can occur, for example, when the market reaches a daily price fluctuation limit ("limit move"), if there is insufficient liquidity in the market.\n
    5.4. Placing contingent orders, such as "stop-loss" or "stop-limit" orders, will not necessarily limit your losses to the intended amounts, since market conditions may make it impossible to execute such orders.\n
    5.5. All Digital Asset positions involve risk, and a "spread" position may not be less risky than an outright "long" or "short" position. The use of leverage can work against you as well as for you and can lead to large losses as well as gains. ALL OF THE POINTS NOTED ABOVE APPLY TO ALL DIGITAL ASSET PAIR AND DIGITAL ASSET AND LEGAL TENDER PAIR TRADING. THIS BRIEF STATEMENT CANNOT, OF COURSE, DISCLOSE ALL THE RISKS AND OTHER ASPECTS ASSOCIATED WITH THESE TRADES. Internet transmission risks. You acknowledge that there are risks associated with utilizing an Internet-based trading system including, but not limited to, the failure of hardware, software, and Internet connections. You acknowledge that Payward shall not be responsible for any communication failures, disruptions, errors, distortions or delays you may experience when trading via the Services, howsoever caused.\n
    </p>\n
    <h2>6. Fees</h2>\n
    <p>
    6.1. Amount of Fees. You agree to pay Payward the fees for trades completed via our Services ("Fees") as made available via the Fees and Pair Info ("Fee Schedule"), which we may change from time to time. Changes to the Fee Schedule are effective as of the effective date indicated in the posting of the revised Fee Schedule to the Services, and will apply prospectively to any trades that take place following the effective date of such revised Fee Schedule.\n
    6.2. Third-Party Fees. In addition to the Fees, your External Account may impose fees in connection with your use of your designated External Account via the Services. Any fees imposed by your External Account provider will not be reflected on the transaction screens containing information regarding applicable Fees. You are solely responsible for paying any fees imposed by an External Account provider.\n
    6.3. Payment of Fees. You authorize us, or our designated payment processor, to charge or deduct your ${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } Account Funds for any applicable Fees owed in connection with trades you complete via the Services.\n
    6.4. Internal fees. You agree to pay the internal Payward fee at additional 1% (all deposits), 1.5% (all the transfers), 2.5% (all insurances if required).\n
    6.5. Collection-Related Costs. If you fail to pay Fees or any other amounts owed to Payward under these Terms and Payward refers your account(s) to a third party for collection, then Payward will charge you the lesser of an 18% collection fee or the maximum percentage permitted by applicable law, to cover Payward's collection-related costs.\n
    </p>\n
    <h2>7. Unclaimed Property</h2>\n
    <p>
    7.1 If for any reason Payward is holding Funds in your ${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } Account on your behalf, and Payward is unable to return your Funds to your designated External Account after a period of inactivity, then Payward may report and remit such Funds in accordance with applicable state unclaimed property laws.\n
    7.2 Withdrawal of funds is carried out from the cryptocurrency wallets of our exchange to other cryptocurrency wallets, which are not part of our exchange and are in operation of other payment systems after the procedures of confirming the ownership of the corresponding cryptocurrency wallet from the corresponding user About the right of ownership and synchronization of our exchange with the cryptocurrency wallet to which the User wants to withdraw funds.\n
    </p>\n
    <h2>8.ACCEPTABLE USE</h2>\n
    <p>
    When accessing or using the Services, you agree that you will not violate any law, contract, intellectual property or other third-party right or commit a tort, and that you are solely responsible for your conduct while using our Services. Without limiting the generality of the foregoing, you agree that you will not:\n
    8.1. Use our Services in any manner that could interfere with, disrupt, negatively affect or inhibit other users from fully enjoying our Services, or that could damage, disable, overburden or impair the functioning of our Services in any manner;\n
    8.2. Use our Services to pay for, support or otherwise engage in any illegal gambling activities; fraud; money-laundering; or terrorist activities; or other illegal activities;\n
    8.3. Use any robot, spider, crawler, scraper or other automated means or interface not provided by us to access our Services or to extract data;\n
    8.4. Use or attempt to use another user's account without authorization;\n
    8.5. Attempt to circumvent any content filtering techniques we employ, or attempt to access any service or area of our Services that you are not authorized to access;\n
    8.6. Develop any third-party applications that interact with our Services without our prior written consent;\n
    8.7. Provide false, inaccurate, or misleading information;\n
    8.8. Encourage or induce any third party to engage in any of the activities prohibited under this Section.\n
    </p>\n
    <h2>9. Feedback</h2>\n
    <p>
    We will own exclusive rights, including all intellectual property rights, to any feedback, suggestions, ideas or other information or materials regarding Payward or our Services that you provide, whether by email, posting through our Services or otherwise ("Feedback"). Any Feedback you submit is nonconfidential and shall become the sole property of Payward. We will be entitled to the unrestricted use and dissemination of such Feedback for any purpose, commercial or otherwise, without acknowledgment or compensation to you. You waive any rights you may have to the Feedback (including any copyrights or moral rights). Do not send us Feedback if you expect to be paid or want to continue to own or claim rights in them; your idea might be great, but we may have already had the same or a similar idea and we do not want disputes. We also have the right to disclose your identity to any third party who is claiming that any content posted by you constitutes a violation of their intellectual property rights, or of their right to privacy. We have the right to remove any posting you make on our website if, in our opinion, your post does not comply with the content standards set out in this section.
    </p>\n
    <h2>10. Copyrights and Other</h2>\n
    <p>
    Intellectual Property Rights Unless otherwise indicated by us, all copyright and other intellectual property rights in all content and other materials contained on our website or provided in connection with the Services, including, without limitation, the Payward or ${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } logo and all designs, text, graphics, pictures, information, data, software, sound files, other files and the selection and arrangement thereof (collectively, "Payward Materials") are the proprietary property of Payward or our licensors or suppliers and are protected by U.S. and international copyright laws and other intellectual property rights laws. We hereby grant you a limited, nonexclusive and non-sublicensable license to access and use the Payward Materials for your personal or internal business use. Such license is subject to these Terms and does not permit (a) any resale of the Payward Materials; (b) the distribution, public performance or public display of any Payward Materials; (c) modifying or otherwise making any derivative uses of the Payward Materials, or any portion thereof; or (d) any use of the Payward Materials other than for their intended purposes. The license granted under this Section will automatically terminate if we suspend or terminate your access to the Services.
    </p>\n
    <h2>11. Trademarks</h2>\n
    <p>
    "Payward," "${import.meta.env.VITE_BASE_EXCHANGE_NAME}," the ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } logo, the Payward logo and any other Payward product or service names, logos or slogans that may appear on our Services are trademarks of Payward, in the United States and in other countries, and may not be copied, imitated or used, in whole or in part, without our prior written permission. You may not use any trademark, product or service name of Payward without our prior written permission, including without limitation any metatags or other "hidden text" utilizing any trademark, product or service name of Payward. In addition, the look and feel of our Services, including all page headers, custom graphics, button icons and scripts, is the service mark, trademark and/or trade dress of Payward and may not be copied, imitated or used, in whole or in part, without our prior written permission. All other trademarks, registered trademarks, product names and company names or logos mentioned through our Services are the property of their respective owners. Reference to any products, services, processes or other information, by name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship or recommendation by us.
    </p>\n
    <h2>12. Suspension; Termination</h2>\n
    <p>
    In the event of any Force Majeure Event (as defined in Section 23.5), breach of this agreement, or any other event that would make provision of the Services commercially unreasonable for Payward, we may, in our discretion and without liability to you, with or without prior notice, suspend your access to all or a portion of our Services. We may terminate your access to the Services in our sole discretion, immediately and without prior notice, and delete or deactivate your ${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } Account and all related information and files in such account without liability to you, including, for instance, in the event that you breach any term of these Terms. In the event of termination, Payward will not attempt to return any Funds stored in your ${
    import.meta.env.VITE_BASE_EXCHANGE_NAME
  } Account not otherwise owed to Payward, unless Payward believes you have committed fraud, negligence or other misconduct.
    </p>\n
    <h2>13. Discontinuance of Services</h2>\n
    <p>
    We may, in our sole discretion and without liability to you, with or without prior notice and at any time, modify or discontinue, temporarily or permanently, any portion of our Services.
    </p>\n
    <h2>14. Disclaimer of Warranties</h2>\n
    <p>
    EXCEPT AS EXPRESSLY PROVIDED TO THE CONTRARY IN A WRITING BY US, OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM, AND YOU WAIVE, ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NONINFRINGEMENT AS TO OUR SERVICES, INCLUDING THE INFORMATION, CONTENT AND MATERIALS CONTAINED THEREIN. YOU ACKNOWLEDGE THAT INFORMATION YOU STORE OR TRANSFER THROUGH OUR SERVICES MAY BECOME IRRETRIEVABLY LOST OR CORRUPTED OR TEMPORARILY UNAVAILABLE DUE TO A VARIETY OF CAUSES, INCLUDING SOFTWARE FAILURES, PROTOCOL CHANGES BY THIRD PARTY PROVIDERS, INTERNET OUTAGES, FORCE MAJEURE EVENT OR OTHER DISASTERS INCLUDING THIRD PARTY DDOS ATTACKS, SCHEDULED OR UNSCHEDULED MAINTENANCE, OR OTHER CAUSES EITHER WITHIN OR OUTSIDE OUR CONTROL. YOU ARE SOLELY RESPONSIBLE FOR BACKING UP AND MAINTAINING DUPLICATE COPIES OF ANY INFORMATION YOU STORE OR TRANSFER THROUGH OUR SERVICES. Some jurisdictions do not allow the disclaimer of implied terms in contracts with consumer, so some or all of the disclaimers in this section may not apply to you.
    </p>\n
    <h2>15. Indemnity</h2>\n
    <p>
    You agree to defend, indemnify and hold harmless Payward (and each of our officers, directors, members, employees, agents and affiliates) from any claim, demand, action, damage, loss, cost or expense, including without limitation reasonable attorneysʼ fees, arising out or relating to (a) your use of, or conduct in connection with, our Services; (b) any Feedback you provide; (c) your violation of these Terms; or (d) your violation of any rights of any other person or entity. If you are obligated to indemnify us, we will have the right, in our sole discretion, to control any action or proceeding (at our expense) and determine whether we wish to settle it. Miscellaneous Entire Agreement; Order of Precedence. These Terms contain the entire agreement, and supersede all prior and contemporaneous understandings between the parties regarding the Services. These Terms do not alter the terms or conditions of any other electronic or written agreement you may have with Payward for the Services or for any other Payward product or service or otherwise. In the event of any conflict between these Terms and any other agreement you may have with Payward, the terms of that other agreement will control only if these Terms are specifically identified and declared to be overridden by such other agreement. Amendment. We reserve the right to make changes or modifications to these Terms from time to time, in our sole discretion. If we make changes to these Terms, we will provide you with notice of such changes, such as by sending an email, providing notice on the homepage of the Site and/or by posting the amended Terms via the applicable Payward websites and mobile applications and updating the "Last Updated" date at the top of these Terms. The amended Terms will be deemed effective immediately upon posting for any new users of the Services. In all other cases, the amended Terms will become effective for preexisting users upon the earlier of either: (i) the date users click or press a button to accept such changes, or (ii) continued use of our Services 30 days after Payward provides notice of such changes. Any amended Terms will apply prospectively to use of the Services after such changes become effective. If you do not agree to any amended Terms, you must discontinue using our Services and contact us to terminate your account. Waiver. Our failure or delay in exercising any right, power or privilege under these Terms shall not operate as a waiver thereof. Severability. The invalidity or unenforceability of any of these Terms shall not affect the validity or enforceability of any other of these Terms, all of which shall remain in full force and effect. Force Majeure Events. Payward shall not be liable for (1) any inaccuracy, error, delay in, or omission of (i) any information, or (ii) the transmission or delivery of information; (2) any loss or damage arising from any event beyond Payward's reasonable control, including but not limited to flood, extraordinary weather conditions, earthquake, or other act of God, fire, war, insurrection, riot, labor dispute, accident, action of government, communications, power failure, or equipment or software malfunction or any other cause beyond Payward's reasonable control (each, a "Force Majeure Event"). Assignment. You may not assign or transfer any of your rights or obligations under these Terms without prior written consent from Payward, including by operation of law or in connection with any change of control. Payward may assign or transfer any or all of its rights under these Terms, in whole or in part, without obtaining your consent or approval. Headings. Headings of sections are for convenience only and shall not be used to limit or construe such sections.
    </p>\n
  `,
  about: {
    title: `What is ${import.meta.env.VITE_BASE_EXCHANGE_NAME}?`,
    paragraph: `Our company begins its history from July 2017, when it was developed and registered by our founder - Benjamin Esch and his team. Our company has come a long way from a simple exchange platform to a complex mechanism, which works smoothly. We have changed the perception of many people about cryptocurrency and its use. We introduced lots of interesting and useful technologies, which are helping us to protect your funds, and helping you to invest your funds with maximum benefit. World's first we created system, which helps you to buy, sell, transfer your funds inside our exchange in few seconds, you don't need to wait blockchain confirmation any more. In our Exchange your funds This one, and lots of another features makes trading in Exchange very comfortable, useful and profitable. After making a deposit, your funds constantly are stored on the permanent wallet, no matter what manipulations you do with them. They are assigned to you in the internal system of our site, so you shouldn't pay a commission on the blockchain network during transfer, trading and other transactions. We are interested in cryptocurrencies and we believe they will change the world and become the main currency in the future. We believe that cryptocurrencies will continue to grow and develop tirelessly, so we offer to invest in them right now, because even a very small investment changes the world.`,
    history: 'Our History',
    desc_history: `${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } is a user-friendly and reliable service for cryptocurrency exchanges. Our platform is free from sign-up and supports more than 500 crypto and fiat currencies.`,
    time1_l: 'Creation',
    time1_p:
      'Our developer was really interested in cryptocurrencies. At this time he realised, that he want to create the best platform for trading and cryptocurrency storage.',
    time2_l: 'Team gathering',
    time2_p:
      'Developer started collecting the team to make his vision come true.',
    time3_l: 'Work started',
    time3_p:
      'Developer with his friends started their huge work in creating platform.',
    time4_l: 'We have opened',
    time4_p: `The ${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } Exchange was officially registered as a platform for trading and storage of cryptocurrency.`,
    time5_l: `${import.meta.env.VITE_BASE_EXCHANGE_NAME} codes`,
    time5_p: `${
      import.meta.env.VITE_BASE_EXCHANGE_NAME
    } codes section has been created.`,
    time6_l: 'Verification',
    time6_p: 'A verification procedure was introduced.',
    time7_l: 'Binary options',
    time7_p: 'Binary options have been added to the trading section.',
    time8_l: 'Staking Service',
    time8_p: 'Staking Service have been added.',
    choose_l: `Why choose ${import.meta.env.VITE_BASE_EXCHANGE_NAME} ?`,
    choose_p:
      'We have served one million users and provided fast, secure, and professional crypto trading services',
    card1_l: '24/7 Support',
    card1_p:
      'Our tickets team is available 24/7. We are receptive to your needs and are always available to help you out.',
    card2_l: 'Secure',
    card2_p:
      'Advanced risk control system in the market. Hybrid hot/cold wallet systems and multi-signature technologies. 100% secure for trading and digital asset management',
    card3_l: 'Easy to use',
    card3_p:
      'An intuitive and user-friendly trading interface will help make your pastime on our platform as comfortable and easy as possible.',
    card4_l: 'Extra Low Trading Fees',
    card4_p: 'Exchange with extra low fees, keep all your profit',
    card5_l: 'Trusted by Industry Experts',
    card5_p:
      'State of the art infrastructure with SHA-384 layer encryption and multi server cross-referencing',
    card6_l: 'Privacy Info Standards',
    card6_p: 'Your information is secured with AUSTRAC inline with AML policy',
  },
  history: {
    deposits: 'Deposits',
    withdraws: 'Withdraws',
    exchanges: 'Exchanges',
    currency: 'currency',
    currencyFrom: 'currency from',
    currencyTo: 'currency to',
    status: 'status',
    address: 'address',
    depositAddress: 'deposit address',
    receivedAddress: 'received address',
    fullAmount: 'amount',
    receivedAmount: 'received amount',
    usdtAmount: 'amount in usdt',
    created: 'date created',
    updated: 'date updated',
    coinFrom: 'coin from',
    coinTo: 'coin to',
    networkFrom: 'network from',
    networkTo: 'network to',
    quantityFrom: 'quantity From',
    quantityTo: 'quantity To',
  },
  privacy: `
  <h2>PRIVACY POLICY ${import.meta.env.VITE_BASE_EXCHANGE_NAME}</h2>\n
  <p>
  1.The purpose of this Privacy Policy is to inform you and provide you with an understanding of how Mek Global Limited (“${
    import.meta.env.VITE_BASE_URL
  }” or “we” or “us” or “our”) handles, collects, uses, discloses and deals with personal data about you (“User”) that you give us, that we receive through third parties or that is in our possession. Further, this Privacy Policy governs the manner in which ${
    import.meta.env.VITE_BASE_URL
  } collects, uses, maintains and/or discloses personal data collected from Users of the ${
    import.meta.env.VITE_BASE_URL
  } website (“Site”). To provide you with our Services, we might need (and sometimes obliged by the law) to collect your personal data.\n
  2.We take our responsibilities under the Constitution of United States of Amerie seriously. We also recognize the importance of the personal data you have entrusted to us and believe that it is our responsibility to properly manage, protect and process your personal data.\n
  3.This privacy policy applies to the Site and all Services offered by ${
    import.meta.env.VITE_BASE_URL
  }.\n
  </p>
  <h2>Personally identifiable information</h2>\n
  <p>4.We may collect personally identifiable information from Users in a variety of ways, including, but not limited to, when Users visit our Site, register on the Site, place an order, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number. Users may, however, visit our Site anonymously. When interacting with us on the Site, Users can always refuse to supply personal data to us, except that it may prevent them from engaging in certain Site related activities or transactions.</p>\n
  <h2>Non-personally identifiable information</h2>\n
  <p>5.We may collect non-personally identifiable information about Users when they interact with our Site.</p>\n
  <h2>What Information Do We Collect?</h2>\n
  <p>6.“Personal data” used in this Privacy Policy is to mean data, whether true or not, about an individual who can be identified from that data, or from that data and other information to which an organization has or is likely to have access. ${
    import.meta.env.VITE_BASE_URL
  } collects information about you when you use our websites (including the Site) and other online products and services and throughout other interactions and services you have with us. Personal data which we may collect include:\n
  1.Name\n
  2.Home Address\n 
  3.Contact Information\n 
  4.Transactional Information\n  
  5.Usage and Preferences\n  
  6.Identification number\n  
  We will collect your personal data in accordance with the legislative purpose of the DPA.\n
  7.We may also collect and store certain information automatically when you visit the Site. Examples include the internet protocol (IP) address used to connect your computer or device to the internet, connection information such as browser type and version, your operating system and platform, a unique reference number linked to the data you enter on our system, login details, the full URL clickstream to, through and from the Site (including date and time), cookie number and your activity on our Site, including the pages you visited, the searches you made and, if relevant, the products/services you purchased.\n
  8.We may receive information about you from third parties if you use any websites or social media platforms operated by third parties (for example, Facebook, Instagram, Twitter etc.) and, if such functionality is available, you have chosen to link your profile on the Site with your profile on those other websites or social media platforms.</p>\n
  <h2>Cookies</h2>\n
  <p>
  9.We may use cookies to identify you from other users on the Site.\n
  10.A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer or device.\n
  11.You can block or deactivate cookies in your browser settings.\n
  12.We use log-in cookies in order to remember you when you have logged in for a seamless experience.\n
  13.We use session cookies to track your movements from page to page and in order to store your selected inputs so you are not constantly asked for the same information.\n
  14.This Site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the Site and ways that we can improve your experience. These cookies may track things such as how long you spend on the Site and the pages that you visit so we can continue to produce engaging content.\n
  15.By continuing to use the Site, you are agreeing to the use of cookies on the Site as outlined above. However, please note that we have no control over the cookies used by third parties.\n
  16.For further information on types of cookies and how they work visit www.allaboutcookies.org\n
  </p>\n
  <h2>Purposes For Collection, Use, Disclosure And Processing Of Your Personal Data</h2>\n
  <p>
`,
};
