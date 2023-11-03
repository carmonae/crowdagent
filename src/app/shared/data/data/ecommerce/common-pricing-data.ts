export interface Becomemember{
   title : string,
   price : string,
   planDetail : planDetail[];
}

export interface planDetail{
   item : string;
}

export interface Simplepricingcard {
   title : string,
   price : string,
   plan_name : string
}

export const BecomeMember : Becomemember[] = [
    {
       title : 'STANDARD' ,
       price : '10',
       planDetail : [
         { item : '50GB Disk Space' },
         { item : '50 Email Accounts' },
         { item : 'Maintenance' },
         { item : '15 Subdomains' },
       ]
    },
    {
        title : 'PREMIUM' ,
        price : '20',
        planDetail : [
         { item : '10% on all product' },
         { item : '50 Email Accounts' },
         { item : 'Maintenance' },
         { item : '15 Subdomains' },
       ]
     },
     {
        title : 'AUTHER PACK' ,
        price : '50',
        planDetail : [
         { item : 'Upload 50 product' },
         { item : '50 Email Accounts' },
         { item : 'Maintenance' },
         { item : '15 Subdomains' },
       ]
     },
     {
        title : 'AUTHER PACK' ,
        price : '50',
        planDetail : [
         { item : 'Upload 50 product' },
         { item : '50 Email Accounts' },
         { item : 'Maintenance' },
         { item : '15 Subdomains' },
       ]
     }
]

export const SimplePricingCard : Simplepricingcard[] = [
   {
      title : 'Standard',
      price : '15',
      plan_name : 'Standard Plan',
   },
   {
      title : 'Business',
      price : '25',
      plan_name : 'Business Plan',
   },
   {
      title : 'Premium',
      price : '35',
      plan_name : 'Premium Plan',
   },
   {
      title : 'Extra',
      price : '45',
      plan_name : 'Extra Plan',
   }
]