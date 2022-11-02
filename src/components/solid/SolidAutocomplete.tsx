import Autocomplete, {
    // AutocompleteChangeDetails,
    // AutocompleteChangeReason,
    // AutocompleteInputChangeReason,
    AutocompleteProps,
    AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";

const SolidAutocomplete = <T,>({
    value,
    setValue,
    inputValue,
    setInputValue,
    options,
    getOptionLabel,
    renderInput,
    ...autocompleteProps
}: {
    value: T | null;
    setValue: (arg0: T | null) => void;
    inputValue: string;
    setInputValue: (arg0: string) => void;
    options: T[];
    getOptionLabel: (option: T) => string;
    renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
} & AutocompleteProps<T, undefined, undefined, undefined>) => {
    const handleChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: T | null,
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
            {...autocompleteProps}
        />
    );
};

export default SolidAutocomplete;
