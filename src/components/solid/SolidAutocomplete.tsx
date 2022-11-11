import { AutocompleteValue } from "@mui/base";
import Autocomplete, {
    // AutocompleteChangeDetails,
    // AutocompleteChangeReason,
    // AutocompleteInputChangeReason,
    AutocompleteProps,
    AutocompleteRenderInputParams,
    // AutocompleteValue,
} from "@mui/material/Autocomplete";

type SolidAutocompleteValue<T> = AutocompleteValue<
    T,
    undefined,
    undefined,
    undefined
>;

type AdditionalAutocompleteProps<T> = AutocompleteProps<
    T,
    undefined,
    undefined,
    undefined
>;

const SolidAutocomplete = <T,>({
    value,
    setValue,
    inputValue,
    setInputValue,
    options,
    getOptionLabel,
    renderInput,
    disableClearableForReal,
    ...autocompleteProps
}: {
    value: SolidAutocompleteValue<T>;
    setValue: (arg0: SolidAutocompleteValue<T>) => void;
    inputValue: string;
    setInputValue: (arg0: string) => void;
    options: T[];
    getOptionLabel: (option: T) => string;
    renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
    disableClearableForReal?: boolean;
} & AdditionalAutocompleteProps<T>) => {
    const handleChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: SolidAutocompleteValue<T>,
        // reason: AutocompleteChangeReason,
        // details?: AutocompleteChangeDetails<T> | undefined,
    ) => {
        setValue(value);
    };

    const handleInputChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: string,
        // reason: AutocompleteInputChangeReason,
    ) => {
        setInputValue(value);
    };

    // const { renderInput, ...autocompletePropsRest } = autocompleteProps;
    // const { sx: inputSx, ...inputPropsRest } = inputProps || {};

    return (
        <Autocomplete
            value={value}
            // onChange={handleChange}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={options}
            getOptionLabel={getOptionLabel}
            renderInput={renderInput}
            disableClearable={disableClearableForReal}
            {...autocompleteProps}
        />
    );
};

export default SolidAutocomplete;
