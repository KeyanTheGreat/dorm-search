import React, { Dispatch, SetStateAction, useState } from 'react';
import Select from 'react-select';
import "./styles/App.css"
import MultiRangeSlider from "multi-range-slider-react";

export interface DropdownsProps {
  resultStr: any;
  setResultStr: Dispatch<SetStateAction<any>>;
  FilteredDorms: Array<string>;
  setFilteredDorms: Dispatch<SetStateAction<Array<string>>>;
}



export default function Dropdowns(props: DropdownsProps) {
  const [campusLocation, setCampusLocation] = useState<Array<string>>(['All']);
  const [floor, setFloor] = useState<Array<string>>(['All']);
  const [partOfSuite, setPartOfSuite] = useState<Array<string>>(['All']);
  const [roomCapacity, setRoomCapacity] = useState<Array<string>>(['All']);
  const [hasBathroom, setHasBathroom] = useState<Array<string>>(['All']);
  const [hasKitchen, setHasKitchen] = useState<Array<string>>(['All']);
  const [minRoomSize, setMinRoomSize] = useState<string>('0');
  const [maxRoomSize, setMaxRoomSize] = useState<string>('500');

  const options = [
    { value: 'All', label: 'All' },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ];

  const optionsFloor = [
    { value: 'All', label: 'All' },
    { value: '1', label: 'Floor 1' },
    { value: '2', label: 'Floor 2' },
    { value: '3', label: 'Floor 3' },
    { value: '4', label: 'Floor 4' },
    { value: '5', label: 'Floor 5' },
    { value: '6', label: 'Floor 6' },
    { value: '7', label: 'Floor 7' },
    { value: '8', label: 'Floor 8' },

  ];

  const optionsBathroom = [
    { value: 'All', label: 'All' },
    { value: 'Private', label: 'Private' },
    { value: 'Communal', label: 'Communal' },
    { value: 'SemiPrivate', label: 'SemiPrivate' },
  ];

  const optionsRoomCap = [
    { value: 'All', label: 'All' },
    { value: 'one', label: '1' },
    { value: 'two', label: '2' },
    { value: 'three', label: '3' },
    { value: 'four', label: '4' },
    { value: 'five', label: '5' },
    { value: 'six', label: '6' },
  ];

  const optionsLoc = [
    { value: 'All', label: 'All' },
    { value: 'WristonQuad', label: 'Wriston Quad' },
    { value: 'MainGreen', label: 'Main Green' },
    { value: 'GradCenter', label: 'Grad Center' },
    { value: 'GregorianQuad', label: 'Gregorian Quad' },
    { value: 'Pembroke', label: 'Pembroke' },
    { value: 'RuthJSimmons', label: 'Ruth J. Simmons Wuad' },
    { value: 'ThayerStreet', label: 'Thayer Street' },
    { value: 'EastCampus', label: 'East Campus' },
    { value: 'Machado', label: 'Machado House' },
  ];

  function filteringNames(filterArray: any[]): string[] {
    const modifiedNames: string[] = [];

    filterArray.forEach(item => {
      //TODO: replce dif names and make ovelay selected lighter
      //TODO: change map names to make consistent with data file (names not address)
      const modifiedName = item.dormBuilding.buildingName.replace("GRAD_CENTER_D", "Graduate Center D")
        .replace("GRADE_CENTER_C", "Graduate Center C").replace("GRAD_CENTER_B", "Graduate Center B")
        .replace("GRADE_CENTER_A", "Graduate Center A").replace("BUXTON_HOUSE", "Buxton House")
        .replace("CHAPIN_HOUSE", "Chapin House").replace("NORTH_HOUSE", "North House")
        .replace("PERKINS_HALL", "Perkins Hall").replace("MORRISS_HALL", "Morriss Hall")
        .replace("YOUNG_ORCHARD_#2", "Young Orchard 2").replace("GODDARD_HOUSE", "Goddard House")
        .replace("MARCY_HOUSE", "Marcy House").replace("WAYLAND_HOUSE", "Wayland House")
        .replace("SEARS_HOUSE", "Sears House").replace("EVERETT_POLAND", "Everett-Poland")
        .replace("JAMESON-MEAD", "Jameson-Mead").replace("ARCHIBALD-BRONSON", "Archibald-Bronson")
        .replace("OLNEY_HOUSE", "Olney House").replace("DIMAN_HOUSE", "Diman House")
        .replace("HARKNESS_HOUSE", "Harkness House").replace("VARTAN_GREGORIAN_QUAD_A", "Vartan Gregorian Quad A")
        .replace("DANOFF_HALL", "Danoff Hall").replace("BARBOUR_HALL", "Barbour Hall")
        .replace("YOUNG_ORCHARD_#4", "Young Orchard 4").replace("YOUNG_ORCHARD_#10", "Young Orchard 10")
        .replace("KING_HOUSE", "King House").replace("SLATER_HALL", "Slater Hall")
        .replace("HOPE_COLLEGE", "Hope College").replace("CASWELL_HALL", "Caswell Hall")
        .replace("HEGEMEN_HALL", "Hegeman Hall").replace("LITTLEFIELD_HALL", "Littlefield Hall")
        .replace("MINDEN_HALL", "Minden Hall").replace("METCALF_HALL", "Metcalf Hall")
        .replace("MILLER_HALL", "Miller Hall").replace("ANDREWS_HALL", "Andrews Hall")
        .replace("DONOVAN_HOUSE", "Donovan House").replace("CHAMPLIN_HALL", "Champlin Hall")
        .replace("NEW_PEMBROKE_#3", "New Pembroke 3").replace("NEW_PEMBROKE_#2", "New Pembroke 2")
        .replace("NEW_PEMBROKE_#1", "New Pembroke 1").replace("NEW_PEMBROKE_#4", "New Pembroke 4")
        .replace("HARAMBEE_HOUSE", "Harambee House").replace("WOOLLEY_HALL", "Woolley Hall")
        .replace("EMERY_HALL", "Emery Hall").replace("WEST_HOUSE", "West House")
        .replace("MACHADO_HOUSE", "Machado House").replace("VARTAN_GREGORIAN_QUAD_B", "Vartan Gregorian Quad B");
      if (!modifiedNames.includes(modifiedName)) {
        modifiedNames.push(modifiedName);
      }
    });

    return modifiedNames;
  }

  async function fetchSearch() {
    const fetch1 = await fetch(
      `http://localhost:3233/filter?campusLocation=${encodeURIComponent(
        campusLocation.join(', ')
      )}&isSuite=${encodeURIComponent(
        partOfSuite.join(', ')
      )}&hasKitchen=${encodeURIComponent(
        hasKitchen.join(', ')
      )}&bathroomType=${encodeURIComponent(
        hasBathroom.join(', ')
      )}&minRoomSize=${encodeURIComponent(
        minRoomSize
      )}&maxRoomSize=${encodeURIComponent(
        maxRoomSize
      )}&roomCapacity=${encodeURIComponent(
        roomCapacity.join(', ')
      )}&floorNumber=${encodeURIComponent(
        floor.join(', ')
      )}`
    );
    const filterjson = await fetch1.json();
    if (filterjson.result === "success") {
      console.log("search successful");
      //console.log(filterjson);
      //props.setResultStr(JSON.stringify(filterjson));
      props.setFilteredDorms(filteringNames(filterjson.filteredDormRoomSet));
      console.log("setfiltered to ", filteringNames(filterjson.filteredDormRoomSet))
    } else {
      console.error("Invalid data from API:", filterjson);
    }
  }

  const handleSearchClick = () => {
    console.log('Search clicked');
    fetchSearch();
  };


  return (
    <div className="dropdown-container">
      <div className="multi-select">
        <label htmlFor="CampusLocation">Campus Location</label>
        <Select
          id="CampusLocation"
          options={optionsLoc}
          isMulti
          value={campusLocation.map(value => optionsLoc.find(option => option.value === value))}
          getOptionLabel={(e: { label: any; }) => e.label}
          getOptionValue={(e: { value: any; }) => e.value}
          onChange={(newSelectedOptions: any) => {
            const allClicked = newSelectedOptions[newSelectedOptions.length - 1]?.value === 'All';
            const hasAllOption = newSelectedOptions[0]?.value === 'All';
            if (allClicked) {
              setCampusLocation(['All']);
            } else if (hasAllOption) {
              setCampusLocation([newSelectedOptions[1]?.value]);
            } else {
              const selectedValues = newSelectedOptions.map((option: any) => option.value);
              setCampusLocation(selectedValues);
            }
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      <div className="multi-select">
        <label htmlFor="FloorNumber">Floors</label>
        <Select
          id="FloorNumber"
          options={optionsFloor}
          isMulti
          value={floor.map(value => optionsFloor.find(option => option.value === value))}
          getOptionLabel={(e: { label: any; }) => e.label}
          getOptionValue={(e: { value: any; }) => e.value}
          onChange={(newSelectedOptions: any) => {
            const allClicked = newSelectedOptions[newSelectedOptions.length - 1]?.value === 'All';
            const hasAllOption = newSelectedOptions[0]?.value === 'All';
            if (allClicked) {
              setFloor(['All']);
            } else if (hasAllOption) {
              setFloor([newSelectedOptions[1]?.value]);
            } else {
              const selectedValues = newSelectedOptions.map((option: any) => option.value);
              setFloor(selectedValues);
            }
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      <div className="multi-select">
        <label htmlFor="PartOfSuite">Part of Suite</label>
        <Select
          id="PartOfSuite"
          options={options}
          isMulti
          value={partOfSuite.map(value => options.find(option => option.value === value))}
          getOptionLabel={(e: { label: any; }) => e.label}
          getOptionValue={(e: { value: any; }) => e.value}
          onChange={(newSelectedOptions: any) => {
            const allClicked = newSelectedOptions[newSelectedOptions.length - 1]?.value === 'All';
            const hasAllOption = newSelectedOptions[0]?.value === 'All';
            if (allClicked) {
              setPartOfSuite(['All']);
            } else if (hasAllOption) {
              setPartOfSuite([newSelectedOptions[1]?.value]);
            } else {
              const selectedValues = newSelectedOptions.map((option: any) => option.value);
              setPartOfSuite(selectedValues);
            }
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      <div className="multi-select">
        <label htmlFor="RoomCapacity">People in Room</label>
        <Select
          id="RoomCapacity"
          options={optionsRoomCap}
          isMulti
          value={roomCapacity.map(value => optionsRoomCap.find(option => option.value === value))}
          getOptionLabel={(e: { label: any; }) => e.label}
          getOptionValue={(e: { value: any; }) => e.value}
          onChange={(newSelectedOptions: any) => {
            const allClicked = newSelectedOptions[newSelectedOptions.length - 1]?.value === 'All';
            const hasAllOption = newSelectedOptions[0]?.value === 'All';
            if (allClicked) {
              setRoomCapacity(['All']);
            } else if (hasAllOption) {
              setRoomCapacity([newSelectedOptions[1]?.value]);
            } else {
              const selectedValues = newSelectedOptions.map((option: any) => option.value);
              setRoomCapacity(selectedValues);
            }
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      <div className="multi-select">
        <label htmlFor="hasBathroom">Has Bathroom</label>
        <Select
          id="hasBathroom"
          options={optionsBathroom}
          isMulti
          value={hasBathroom.map(value => optionsBathroom.find(option => option.value === value))}
          getOptionLabel={(e: { label: any; }) => e.label}
          getOptionValue={(e: { value: any; }) => e.value}
          onChange={(newSelectedOptions: any) => {
            const allClicked = newSelectedOptions[newSelectedOptions.length - 1]?.value === 'All';
            const hasAllOption = newSelectedOptions[0]?.value === 'All';
            if (allClicked) {
              setHasBathroom(['All']);
            } else if (hasAllOption) {
              setHasBathroom([newSelectedOptions[1]?.value]);
            } else {
              const selectedValues = newSelectedOptions.map((option: any) => option.value);
              setHasBathroom(selectedValues);
            }
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      <div className="multi-select">
        <label htmlFor="HasKitchen">Has Kitchen</label>
        <Select
          id="HasKitchen"
          options={options}
          isMulti
          value={hasKitchen.map(value => options.find(option => option.value === value))}
          getOptionLabel={(e: { label: any; }) => e.label}
          getOptionValue={(e: { value: any; }) => e.value}
          onChange={(newSelectedOptions: any) => {
            const allClicked = newSelectedOptions[newSelectedOptions.length - 1]?.value === 'All';
            const hasAllOption = newSelectedOptions[0]?.value === 'All';
            if (allClicked) {
              setHasKitchen(['All']);
            } else if (hasAllOption) {
              setHasKitchen([newSelectedOptions[1]?.value]);
            } else {
              const selectedValues = newSelectedOptions.map((option: any) => option.value);
              setHasKitchen(selectedValues);
            }
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      <div className='multi-range-slider-container'>
        <label htmlFor="RoomSize">Room Size</label>
        <MultiRangeSlider
          min={0}
          max={500}
          step={20}
          minValue={minRoomSize}
          maxValue={maxRoomSize}
          onInput={(e: { minValue: any; maxValue: any; }) => {
            setMaxRoomSize(e.maxValue)
            setMinRoomSize(e.minValue)
          }}
        ></MultiRangeSlider>
        <p>
          Selected range: {minRoomSize} - {maxRoomSize}
        </p>
      </div>

      <div className="search-button-container">
        <button className="search-button" onClick={handleSearchClick}>Search</button>
      </div>
    </div>
  );
}



