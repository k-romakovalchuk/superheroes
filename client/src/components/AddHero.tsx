import classNames from 'classnames';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { heroesAsync } from '../features/heroesSlice';
import {
  clearNewComment, createHeroAsync, setFormVisible, setNewHeroError, setNewHeroField, setSubmit,
} from '../features/newHeroSlice';

export enum NewCommentKeys {
  RealName = 'realName',
  Nickname = 'nickname',
  OriginDescription = 'originDescription',
  Superpowers = 'superpowers',
  CatchPhrase = 'catchPhrase',
}

export const AddHero: React.FC = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { newHero: values, newHeroError: errors } = useAppSelector(state => state.newHero);

  const dispatch = useAppDispatch();

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

    if (!nickname || !realName || !originDescription || !catchPhrase || !superpowers || !images) {
      return;
    }

    setSubmitting(true);

    const formData = new FormData(event.currentTarget);

    dispatch(createHeroAsync(formData));
    dispatch(heroesAsync(1));

    dispatch(setSubmit);
    setSubmitting(false);

    dispatch(clearNewComment);
  };

  return (
    <section className="section" style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <div className="field">
          <div className="control">
            <input
              className={classNames('input', { 'is-danger': errors.nickname })}
              type="text"
              placeholder="Ім'я супергероя"
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
                <p className="help is-danger">Поле не може бути пустим</p>
              </>
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className={classNames('input', { 'is-danger': errors.realName })}
              type="text"
              placeholder="Ім'я актора"
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
                <p className="help is-danger">Поле не може бути пустим</p>
              </>
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              className={classNames('textarea', { 'is-danger': errors.catchPhrase })}
              placeholder="Крилата фраза супергероя"
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
                <p className="help is-danger">Поле не може бути пустим</p>
              </>
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              className={classNames('textarea', { 'is-danger': errors.originDescription })}
              placeholder="Опис походження"
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
                <p className="help is-danger">Поле не може бути пустим</p>
              </>
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              className={classNames('textarea', { 'is-danger': errors.superpowers })}
              placeholder="Надздібності"
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
                <p className="help is-danger">Поле не може бути пустим</p>
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
                name="images"
                accept=".jpg, .jpeg, .png, .svg"
                onChange={(event) => {
                  setImages(event.target.files);
                }}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Виберіть зображення
                </span>
              </span>
              <span className="file-name">
                {images && images[0].name}
                {' '}
                {images && images?.length > 1 && '...'}
              </span>
            </label>
          </div>
          {errors.images && (
            <>
              <span className="icon is-small is-right has-text-danger">
                <i className="fas fa-exclamation-triangle" />
              </span>
              <p className="help is-danger">Зображення є обов'язковим</p>
            </>
          )}
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              className={classNames('button', 'is-link', {
                'is-loading': submitting,
              })}
              type="submit"
            >
              Додати
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
