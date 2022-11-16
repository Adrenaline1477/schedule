import { ChangeEvent, FC, ReactNode, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';

import { ButtonStandart } from '@/components/buttons/button-standart';
import { Overlay } from '@/compound/overlay';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { uploadUserAvatar } from '@/store/user/asyncActions';
import { selectUserIsLoading } from '@/store/user/selectors';

import styles from './index.module.scss';

type ChangeImgPopupType = {
    isOpened: boolean;
    onClose: () => void;
};

export const ChangeImgPopup: FC<ChangeImgPopupType> = ({ onClose, isOpened }) => {
    const dispatch = useAppDispatch();
    const [avatarImg, setAvatarImg] = useState<any>(null);
    const [avatarImgUrl, setAvatarImgUrl] = useState<any>(null);

    const setIsLoadingUser = useAppSelector(selectUserIsLoading);

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        setAvatarImgUrl(fileReader.result);
    };
    const uploadImg = async () => {
        if (!avatarImgUrl) return;
        await dispatch(uploadUserAvatar(avatarImg));
        setAvatarImg(null);
        setAvatarImgUrl(null);
        onClose();
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files![0];
        setAvatarImg(file);
        fileReader.readAsDataURL(file);
    };
    return (
        <Overlay onClose={onClose} isOpened={isOpened}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <p>{avatarImgUrl ? 'Предпросмотр новой фоторафии' : 'Загрузка новой фотографии'}</p>
                    <div className={styles.crossWrapper} onClick={onClose}>
                        <MdOutlineClose />
                    </div>
                </div>
                <div className={styles.content}>
                    {avatarImgUrl ? (
                        <>
                            <div className={styles.imgWrapper}>
                                <img src={avatarImgUrl} alt="avatar" />
                            </div>
                            <div className={styles.btnGroup}>
                                <ButtonStandart
                                    isloading={setIsLoadingUser}
                                    name="Подтвердить"
                                    handleClick={uploadImg}
                                />
                                <ButtonStandart
                                    name="Вернуться назад"
                                    handleClick={() => {
                                        setAvatarImgUrl(null);
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <label htmlFor="file">Выбрать файл</label>
                            <input id="file" onChange={handleFileChange} className={styles.file} type="file" />
                        </>
                    )}
                </div>
            </div>
        </Overlay>
    );
};
