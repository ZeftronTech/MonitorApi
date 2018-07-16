var settings = {
    database : {
        postgres : {
            user : 'azizahtas',
            password : 'azizahtas',
            database : 'smartrack',
            host : 'smart-rack.c7neg6roarnk.us-east-1.rds.amazonaws.com',
            port : 5432
        }
    },
    mail : {
         service: 'gmail',
             auth: {
                 user: 'ahtastraders@gmail.com',
                 pass: '09403080450'
             },
            from: 'azizahtas@gmail.com',
            to: [
                'sashi7582@gmail.com',
                'abhishek.solapurkar@itconnectus.com',
                'alerts@mysmartshelf.com',
                'azizahtas@gmail.com'
            ]
    }
}


module.exports = settings;
