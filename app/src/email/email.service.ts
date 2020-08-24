import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import * as sgMail  from '@sendgrid/mail';

import { MailDataRequired } from '@sendgrid/mail';

@Injectable()
export class EmailService {
    // constructor(
    // ) {};
    private logger = new Logger('EmailService');
    
    async sendWelcome(email:string,jwt:string):Promise<void> {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const verifyUrl:string = process.env.API_BASE_URL + '/api/v1/auth/verify-email/'+jwt; 

        const msg:MailDataRequired = {
        to: email,
        from: 'info@pohatta.com',
        subject: 'P.Ohatta App - vahvista sähköposti',
        text: `
        Tervetuloa mukaan!

        Mahtava nähdä, että sinä olet kiinnostunut oman taloutesi hallitsemisesta.
        Niin minäkin ja juuri siitä syystä tämä palvelu on perustettu. Jos kaipaat apua
        tai kohtaat muita ongelmia palvelun käytössä, voit laittaa suoraan minulle sähköpostia
        osoitteeseen mikko@pohatta.com tai vaihtoehtoisesti Twitterissä viestiä @RahaPohatta

        Vahvista vielä sähköpostisi avaamalla selaimessa sivu ${verifyUrl} ja sen jälkeen palvelu on käytössäsi.

        Terveisin Mikko / P.Ohatta
        `,
        html: 
        `
        <h1>Tervetuloa mukaan!</h1>

        <p>
            Mahtava nähdä, että sinä olet kiinnostunut oman taloutesi hallitsemisesta.
            Niin minäkin ja juuri siitä syystä tämä palvelu on perustettu. Jos kaipaat apua
            tai kohtaat muita ongelmia palvelun käytössä, voit laittaa suoraan minulle sähköpostia
            osoitteeseen mikko@pohatta.com tai vaihtoehtoisesti Twitterissä viestiä <a href="https://twitter.com/RahaPohatta" target="blank">@RahaPohatta</a>
        </p>

        <p>Vahvista vielä sähköpostisi klikkaamalla <a href="${verifyUrl}" target="blank">tästä</a> ja sen jälkeen palvelu on käytössäsi.</p>

        <p><i>Terveisin Mikko / P.Ohatta</i></p>
        `,
        };
        
        sgMail.send(msg)
        .then(() => {
            this.logger.log(`Verify email sent`, "email to:" + msg.to + " " + msg.subject);
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed signUp`, error.stack);
        });
        ;
    };

    async sendForgotten(email:string,jwt:string):Promise<void> {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const forgottenUrl:string = process.env.API_BASE_URL + '/api/v1/auth/signin-forgotten/'+jwt; 
        // console.log('sendForgotten', forgottenUrl);

        const msg:MailDataRequired = {
        to: email,
        from: 'info@pohatta.com',
        subject: 'P.Ohatta App - vaihda salasana',
        text: `
        Salasanan vaihto pyydetty

        Jos pyysit salasanan vaihtoa, avaa alla oleva linkki selaimessa ja voit asettaa uuden salasanan.
        
        ${forgottenUrl}
        
        Jos et pyytänyt salasanan vaihtoa, tee ilmoitus tästä viestistä sähköpostilla osoitteeseen mikko@pohatta.com

        P.Ohatta - App info
        
        `,
        html: 
        `
        <h1>Salasanan vaihto pyydetty</h1>
        <p> Jos pyysit salasanan vaihtoa, klikkaa alla olevaa linkkiä ja voit asettaa uuden salasanan.</p>
        <p><a href="${forgottenUrl}" target="blank">Vaihda salasana</a></p>
        <p> Jos et pyytänyt salasanan vaihtoa, tee ilmoitus tästä viestistä sähköpostilla osoitteeseen mikko@pohatta.com </p>
        <p><i>P.Ohatta - App info</i></p>
        `,
        };
        
        sgMail.send(msg)
        .then(() => {
            this.logger.log(`Forgotten passw sent`, "email to:" + msg.to + " " + msg.subject);
        })
        .catch( (error:any) =>{
            this.logger.error(`Forgotten passw sent`, error.stack);
            throw new InternalServerErrorException({message: 'e_500'});
        });
        ;
    };
}

