import { VkUser } from '@/shared/vk-api.ts';

export class User implements UserI {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    screenName: string;
    sex: 'not-specified' | 'female' | 'male';
    age?: number;

    constructor(vkUser: VkUser) {
        this.id = vkUser.id;
        this.firstName = vkUser.first_name;
        this.lastName = vkUser.last_name;
        this.avatar = vkUser.photo_200;
        this.screenName = vkUser.screen_name;

        switch (vkUser.sex) {
            case 0:
                this.sex = 'not-specified';
                break;
            case 1:
                this.sex = 'female';
                break;
            case 2:
                this.sex = 'male';
                break;
        }

        // Calculating age from birthdate
        if (vkUser.bdate && vkUser.bdate.split('.').length === 3) {
            const birthdate = vkUser.bdate.split('.');
            const birthYear = Number(birthdate[2]);
            const birthMonth = Number(birthdate[1]);
            const birthDay = Number(birthdate[0]);

            const today = new Date();
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth() + 1;
            const todayDay = today.getDate();

            let age = todayYear - birthYear;

            if (todayMonth < birthMonth) {
                age -= 1;
            } else if (todayMonth === birthMonth && todayDay < birthDay) {
                age -= 1;
            }

            this.age = age;
        }
    }
}

export interface UserI {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    screenName: string;
    sex: 'not-specified' | 'female' | 'male';
    age?: number;
}
