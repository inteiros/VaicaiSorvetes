interface IMailConfig {
    driver: 'ethereal' | 'ses';

    region: string;

    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    region: process.env.AWS_DEFAULT_REGION,

    defaults: {
        from: {
            email: '',
            name: 'Eler',
        },
    },
} as IMailConfig;
