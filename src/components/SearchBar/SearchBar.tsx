import toast from 'react-hot-toast';
import css from './SearchBar.module.css';
import { FormEvent } from 'react';

type SearchBarProps = { onSubmit: (value: string) => void };

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputElement = form.elements.namedItem('search') as HTMLInputElement;
    const value = inputElement.value.trim();

    if (!value) {
      toast.error('Please enter a search term', {
        position: 'top-right',
      });

      return;
    }
    onSubmit(value);
    form.reset();
  };

  return (
    <header className={css.searchBarHeader}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.searchBarInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <button type="submit" className={css.searchBarBtn}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
