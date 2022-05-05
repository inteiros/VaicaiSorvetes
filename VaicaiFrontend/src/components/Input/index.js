import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
  } from 'react';

  import { FiAlertCircle } from 'react-icons/fi';
  import { useField } from '@unform/core';

  import { Container, Error } from './styles';

  const Input = ({ name, icon: Icon, ...rest }) => {
    const [isFilled, setIsFilled] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);
    const inputRef = useRef(null);

    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
      setIsFocused(false);

      setIsFilled(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    }, [fieldName, registerField]);

    return (
      <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
        {Icon && <Icon size={20} />}
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    );
  };

  export default Input;
