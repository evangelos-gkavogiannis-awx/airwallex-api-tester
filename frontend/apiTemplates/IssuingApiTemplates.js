const IssuingApiTemplates = {
    create_cardholder: {
      email: "john3@example.com",
      individual: {
        address: {
          city: "Melbourne",
          country: "AU",
          line1: "44 Gillespie St",
          line2: "Unit 2",
          postcode: "3121",
          state: "VIC"
        },
        date_of_birth: "1982-11-02",
        express_consent_obtained: "yes",
        name: {
          first_name: "John",
          last_name: "Smith",
          middle_name: "Fitzgerald",
          title: "Mr"
        },
        nationality: "UK"
      },
      mobile_number: "61432100100",
      postal_address: {
        city: "Melbourne",
        country: "AU",
        line1: "44 Gillespie St",
        line2: "Unit 2",
        postcode: "3121",
        state: "VIC"
      },
      type: "INDIVIDUAL"
    },
  
    create_card: {
      authorization_controls: {
        allowed_transaction_count: "MULTIPLE",
        transaction_limits: {
          currency: "EUR",
          limits: [
            {
              amount: 3000,
              interval: "PER_TRANSACTION"
            }
          ]
        }
      },
      is_personalized: true,
      program: {
        purpose: "COMMERCIAL"
      },
      created_by: "",
      form_factor: "PHYSICAL",
      cardholder_id: "",
      request_id: ""
    }
  };
  
  export default IssuingApiTemplates;
  