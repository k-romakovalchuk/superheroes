import classNames from 'classnames';
import React, { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setHero } from '../features/heroesSlice';
import {
  clearNewComment, setFormVisible, setNewHero, setNewHeroError, setNewHeroField, setSubmit, updateHeroAsync,
} from '../features/newHeroSlice';
import { NewCommentKeys } from './AddHero';

export const EditHero: React.FC = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteImage, setDeleteImage] = useState('');

  const { newHero: values, newHeroError: errors } = useAppSelector(state => state.newHero);
  const { hero } = useAppSelector(state => state.heroes);

  const dispatch = useAppDispatch();
  const nameImages = useMemo(() => {
    const mass = [];

    if (images) {
      for (const item of images) {
        mass.push(item.name);
      }
    }

    return mass;
  }, [images]);

  const handleChange = (field: NewCommentKeys, value: string) => {
    dispatch(setNewHeroError({ ...errors, [field]: false }));
    dispatch(setNewHeroField({ key: field, value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      nickname, realName, originDescription, catchPhrase, superpowers,
    } = values;

    dispatch(setNewHeroError({
      nickname: !nickname,
      realName: !realName,
      originDescription: !originDescription,
      superpowers: !superpowers,
      catchPhrase: !catchPhrase,
      images: !images,
    }));

    if (!nickname || !realName || !originDescription || !catchPhrase || !superpowers) {
      return;
    }

    setSubmitting(true);

    const formData = new FormData(event.currentTarget);

    if (hero?.id) {
      const arg = {
        id: hero.id,
        data: formData,
      };

      dispatch(updateHeroAsync(arg));
      const newImages = [...hero.images, ...nameImages].filter(item => item !== deleteImage);

      dispatch(setHero({
        nickname,
        realName,
        originDescription,
        superpowers,
        catchPhrase,
        images: newImages,
        id: hero.id,
      }));
    }

    dispatch(setSubmit);
    setSubmitting(false);

    dispatch(clearNewComment);
    dispatch(setFormVisible(false));
  };

  useEffect(() => {
    dispatch(setNewHero({
      nickname: hero?.nickname || '',
      realName: hero?.realName || '',
      originDescription: hero?.originDescription || '',
      superpowers: hero?.superpowers || '',
      catchPhrase: hero?.catchPhrase || '',
    }));
  }, [hero]);

  return (
    <section className="section" style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <div className="field">
          <div className="control">
            <input
              className={classNames('input', { 'is-danger': errors.nickname })}
              type="text"
              name="nickname"
              value={values.nickname}
              onChange={(event) => {
                handleChange(NewCommentKeys.Nickname, event.target.value);
              }}
            />

            {errors.nickname && (
              <>
                <span className="icon is-small is-right has-text-danger">
                  <i className="fas fa-exclamation-triangle" />
                </span>
                <p className="help is-danger">Field is required</p>
              </>
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className={classNames('input', { 'is-danger': errors.realName })}
              type="text"
              name="realName"
              value={values.realName}
              onChange={(event) => {
                handleChange(NewCommentKeys.RealName, event.target.value);
              }}
            />

            {errors.realName && (
              <>
                <span className="icon is-small is-right has-text-danger">
                  <i className="fas fa-exclamation-triangle" />
                </span>
                <p className="help is-danger">Field is required</p>
              </>
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              className={classNames('textarea', { 'is-danger': errors.catchPhrase })}
              value={values.catchPhrase}
              name="catchPhrase"
              onChange={(event) => {
                handleChange(NewCommentKeys.CatchPhrase, event.target.value);
              }}
            >
            </textarea>

            {errors.catchPhrase && (
              <>
                <span className="icon is-small is-right has-text-danger">
                  <i className="fas fa-exclamation-triangle" />
                </span>
                <p className="help is-danger">Field is required</p>
              </>
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              className={classNames('textarea', { 'is-danger': errors.originDescription })}
              value={values.originDescription}
              name="originDescription"
              onChange={(event) => {
                handleChange(NewCommentKeys.OriginDescription, event.target.value);
              }}
            >
            </textarea>

            {errors.originDescription && (
              <>
                <span className="icon is-small is-right has-text-danger">
                  <i className="fas fa-exclamation-triangle" />
                </span>
                <p className="help is-danger">Field is required</p>
              </>
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              className={classNames('textarea', { 'is-danger': errors.superpowers })}
              value={values.superpowers}
              name="superpowers"
              onChange={(event) => {
                handleChange(NewCommentKeys.Superpowers, event.target.value);
              }}
            >
            </textarea>

            {errors.superpowers && (
              <>
                <span className="icon is-small is-right has-text-danger">
                  <i className="fas fa-exclamation-triangle" />
                </span>
                <p className="help is-danger">Field is required</p>
              </>
            )}
          </div>
        </div>
        <div className="field">
          <div className="file has-name is-fullwidth">
            <label className="file-label">
              <input
                type="file"
                multiple
                className="file-input"
                accept=".jpg, .jpeg, .png, .svg"
                name="images"
                onChange={(event) => {
                  setImages(event.target.files);
                }}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Додати зображення
                </span>
              </span>
              <span className="file-name">
                {images && images[0].name}
                {' '}
                {images && images?.length > 1 && '...'}
              </span>
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <div className="select ">
              <select
                name="deleteImage"
                onChange={(e) => {
                  setDeleteImage(e.target.value);
                }}
              >
                <option value="">Видалити зображення</option>
                {hero?.images.map((image, i) => (
                  <option key={uuidv4()} value={image}>{image}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              className={classNames('button', 'is-link', {
                'is-loading': submitting,
              })}
              type="submit"
            >
              Змінити
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link is-light"
              onClick={() => {
                dispatch(setFormVisible(false));
                dispatch(setNewHeroError({
                  nickname: false,
                  realName: false,
                  originDescription: false,
                  superpowers: false,
                  catchPhrase: false,
                  images: false,
                }));
              }}
            >
              Вийти
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
