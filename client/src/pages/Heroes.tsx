import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { EditHero } from '../components/EditHero';
import { heroAsync } from '../features/heroesSlice';
import { clearNewComment, deleteHeroAsync, setFormVisible } from '../features/newHeroSlice';

export const Heroes: React.FC = () => {
  const { hero, status } = useAppSelector(state => state.heroes);
  const { formVisible } = useAppSelector(state => state.newHero);

  const navigate = useNavigate();

  const [image, setImage] = useState<string | null>(null);

  const location = useLocation();
  const heroId = location.pathname.split('/')[2];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(heroAsync(heroId));
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {status === 'loading' && (
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="loader" />
      )}
      {status === 'idle' && (
        <section className="section" style={{ maxWidth: 'max-content', margin: '0 auto' }}>
          <div
            className="block"
            style={{
              display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'max-content',
            }}
            onClick={() => {
              navigate(-1);
              dispatch(setFormVisible(false));
            }}
          >
            <img src="https://img.icons8.com/material-outlined/24/000000/back--v1.png" />
            <p className="subtitle is-5">Назад</p>
          </div>
          <h1 className="title is-1">{hero?.nickname}</h1>
          <div style={{ display: 'flex', gap: '50px', marginTop: '30px' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '20px', width: '50px', height: '500px', overflow: 'auto',
            }}
            >
              {hero?.images.map(item => (
                <p
                  key={uuidv4()}
                  style={{
                    border: `${image === item ? '1px solid blue' : ''}`, backgroundImage: `url(http://localhost:5000/${item})`, width: '50px', height: '50px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                  }}
                  onClick={() => {
                    setImage(item);
                  }}
                >
                </p>
              ))}
            </div>
            <figure
              className="image"
              style={{
                height: '500px',
                width: '650px',
                backgroundImage: `url(http://localhost:5000/${(image || hero?.images[0])}`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                marginBottom: '50px',
              }}
            >
            </figure>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <button
                className="button is-link is-medium"
                onClick={() => {
                  dispatch(setFormVisible(true));
                }}
              >
                Змінити дані
              </button>
              <button
                className="button is-danger is-medium"
                onClick={() => {
                  dispatch(deleteHeroAsync(heroId));
                  navigate(-1);
                }}
              >
                Видалити
              </button>
            </div>
          </div>
          <h2 className="title is-3">Справжнє ім'я</h2>
          <div className="block" style={{ maxWidth: '700px' }}>
            <p className="subtitle is-4">
              {hero?.realName}
            </p>
          </div>
          <h2 className="title is-3">Крилата фраза</h2>
          <div className="block" style={{ maxWidth: '700px' }}>
            <p className="subtitle is-4">
              {hero?.catchPhrase}
            </p>
          </div>
          <h2 className="title is-3">Супер-сила</h2>
          <div className="block" style={{ maxWidth: '700px' }}>
            <p className="subtitle is-4">
              {hero?.superpowers}
            </p>
          </div>
          <h2 className="title is-3">Опис походження</h2>
          <div className="block" style={{ maxWidth: '700px' }}>
            <p className="subtitle is-4">
              {hero?.originDescription}
            </p>
          </div>
        </section>
      )}
      {status === 'failed' && (
        <h1 className="title is-1">Не вдалося завантажити дані</h1>
      )}
      {formVisible && <EditHero /> }
    </div>
  );
};
