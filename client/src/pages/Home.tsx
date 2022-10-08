import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { heroesAsync } from '../features/heroesSlice';
import { AddHero } from '../components/AddHero';
import { setFormVisible } from '../features/newHeroSlice';

export const Home: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { heroes, heroesLength, status } = useAppSelector(state => state.heroes);
  const { formVisible, submit } = useAppSelector(state => state.newHero);

  const pageLength = Math.ceil(heroesLength / 5);
  const pagination: number[] = [];

  for (let i = 1; i <= pageLength; i++) {
    pagination.push(i);
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(heroesAsync(1));
  }, [submit]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {status === 'loading' && (
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="loader" />
      )}
      {status === 'idle' && (
        <section className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="title">
            Супергерої
            {' '}
            <img
              src="https://img.icons8.com/material/24/000000/add-user-group-woman-man.png"
              onClick={() => {
                dispatch(setFormVisible(true));
              }}
            />
          </h1>
          <div className="hero" style={{ display: 'flex', alignItems: 'center' }}>
            {heroes.map(hero => (
              <div className="hero-body" key={hero.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <NavLink
                  to={`/hero/${hero.id}`}
                  onClick={() => {
                    dispatch(setFormVisible(false));
                  }}
                >
                  <h2
                    className="subtitle"
                    style={{ marginBottom: '30px' }}
                  >
                    {hero.nickname}
                  </h2>
                </NavLink>
                <NavLink
                  to={`/hero/${hero.id}`}
                  onClick={() => {
                    dispatch(setFormVisible(false));
                  }}
                >
                  <p
                    className="image"
                    style={{
                      width: 650, height: 400, backgroundImage: `url(http://localhost:5000/${hero.images[0]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                    }}
                  >
                  </p>
                </NavLink>
              </div>
            ))}
          </div>
          <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <ul className="pagination-list">
              {pagination.map(item => (
                <li key={item}>
                  <a
                    className={classnames('pagination-link', {
                      'pagination-link is-current': item === pageNumber,
                    })}
                    aria-label={item === pageNumber ? `Page ${item}` : `Goto page ${item}`}
                    onClick={() => {
                      setPageNumber(item);
                      dispatch(heroesAsync(item));
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      )}
      {status === 'failed' && (
        <h1 className="title is-1">Не вдалося завантажити дані</h1>
      )}
      {formVisible && (
        <AddHero />
      )}
    </div>
  );
};
