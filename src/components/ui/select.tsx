// eslint-disable-next-line no-restricted-imports
import ReSelect, {Props} from 'react-select';
import {colors} from '@theme/colors';

export const Select = ({...otherProps}: Props) => {
  return (
    <ReSelect
      {...otherProps}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: colors.primary,
          primary25: colors.primary25,
        },
      })}
    />
  );
};
