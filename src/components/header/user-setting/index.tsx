import { FC } from 'react';

import { UserSettingsList } from '@/components/header/user-settings-list';
import { useAppSelector } from '@/hooks/redux-hook';
import { selectUserPhotoByName } from '@/store/user/selectors';

import styles from './index.module.scss';

type UserSettingsPropsType = {
    onCLickSettingsToggler: () => void;
    isActiveSettings: boolean;
};

export const UserSetting: FC<UserSettingsPropsType> = ({ onCLickSettingsToggler, isActiveSettings }) => {
    const userPhoto = useAppSelector(selectUserPhotoByName);
    const cn = isActiveSettings ? `${styles.user} ${styles.active}` : `${styles.user}`;
    return (
        <div className={cn}>
            <img src={userPhoto} alt="user" onClick={onCLickSettingsToggler} />
            <UserSettingsList isActiveSettings={isActiveSettings} />
        </div>
    );
};
