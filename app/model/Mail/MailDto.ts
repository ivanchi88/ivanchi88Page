export class MailDto {
    constructor(data: Partial<MailDto>){
        Object.assign(this, data);
    }

    destinatary: string | undefined;
    subject: string | undefined;
    message: string | undefined;
    files: any [] | undefined;
}