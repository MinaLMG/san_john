<Autocomplete
  disablePortal
  id="combo-box-demo"
  options={persons.map((person) => {
    return person.name;
  })}
  sx={{ width: "50%" }}
  renderInput={(params) => (
    <TextField {...params} label="اسم الخادم" sep></TextField>
  )}
  value={chosen}
  onChange={(e, newVal) => {
    setChosen(newVal);
  }}
  freeSolo
/>;
