export const authCredentialsDto = { email: "test@test.com", passw: "test"};

export const resolvedMemberResponse = {
    status: 201,
    msg: 'Tervetuloa mukaan!',
    d: {
        id: 1,
        email: authCredentialsDto.email,
        email_verified: false,
        passw: '$2a$12$m4n1jKNDjgWgy0xUX/nSnuQxi0YC3Smy8rlI.Ek8CjGdjynYtL14O', // Salasanana1!
        salt: '$2a$12$m4n1jKNDjgWgy0xUX/nSnu',
        is_blocked: false,
        customer_id: 1,
        created_on: '2020-05-08T16:17:48.608826+03:00',
        updated_on: '2020-05-08T16:17:48.608826+03:00'
    }
};                                                                   
export const member = resolvedMemberResponse.d;

export const resolvedNoMember = {
    status: 0,
    msg: '',
    d: {}
};