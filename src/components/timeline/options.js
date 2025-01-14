let timelineStartYear = 1970;
let timelineEndYear = 2020;

const includeList = [];
const ignoreList = [];

const eventData = [
  { title: "Event A", description: "Description A", year: 1970, character: "Tom", location: "Paris" },
  { title: "Event B", description: "Description B", year: 1980, character: "Jerry", location: "NYC" },
  { title: "Event C", description: "Description C", year: 1990, character: "Alice", location: "Berlin" },
  { title: "Event D", description: "Description D", year: 2000, character: "Tom", location: "Paris" },
  { title: "Event E", description: "Description E", year: 2010, character: "Bob", location: "Barcelona" },
  { title: "Event F", description: "Description F", year: 2020, character: "Jerry", location: "Paris" },
];

localStorage.setItem("events", eventData);

// Extract attributes and values for autocomplete
const attributes = Object.keys(eventData[0]).filter(key => key !== "title" && key !== "description" && key !== "year");
const attributeValues = attributes.reduce((values, attr) => {
  values[attr] = [...new Set(eventData.map(event => event[attr]))];
  return values;
}, {});

function getSuggestions(input, isAttribute) {
  if (isAttribute) {
    return attributes.filter(attr => attr.toLowerCase().startsWith(input.toLowerCase()));
  }
  const [attribute] = input.split(":").map(str => str.trim());
  if (attributes.includes(attribute)) {
    return attributeValues[attribute].filter(value => value.toLowerCase().startsWith(input.split(":")[1]?.trim().toLowerCase() || ""));
  }
  return [];
}

function updateStartYear(target) {
  const parsedVal = parseInt(target.value, 10);
  if (!isNaN(parsedVal)) {
    timelineStartYear = parsedVal;
    updateEvents();
  } else {
    target.value = timelineStartYear;
  }
}

document.getElementById("startYear").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    updateStartYear(e.target);
  }
});

document.getElementById("startYear").addEventListener("blur", (e) => {
  updateStartYear(e.target);
});


function updateEndYear(target) {
  const parsedVal = parseInt(target.value, 10);
  if (!isNaN(parsedVal)) {
    timelineEndYear = parsedVal;
    updateEvents();
  } else {
    target.value = timelineEndYear;
  }
}

document.getElementById("endYear").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    updateEndYear(e.target);
  }
});

document.getElementById("endYear").addEventListener("blur", (e) => {
  updateEndYear(e.target);
});

function positionDropdown(input, dropdown) {
  const rect = input.getBoundingClientRect();
  dropdown.style.position = "absolute";
  dropdown.style.left = `${rect.left}px`;
  dropdown.style.top = `${rect.bottom}px`;
  dropdown.style.width = `${rect.width}px`;
}


function addFilterElement(input, dropdown, list, listName, addToFilterList) {
  dropdown.style.display = "none";
  dropdown.innerHTML = "";

  const raw = input.value.trim();
  const [attribute, rawValue] = raw.split(":").map((s) => s.trim());

  if (attributes.includes(attribute) && rawValue) {
    addToFilterList({ attribute, value: rawValue }, list, listName);
  }

  input.value = "";
  input.focus();
}

function fillDropdown({
  dropdown,
  suggestions,
  input,
  isAttribute,
  userInput,
  list,
  listName,
  addToFilterList,
}) {
  dropdown.innerHTML = "";

  suggestions.forEach((suggestion) => {
    const option = document.createElement("div");
    option.className = "autocomplete-option";

    if (isAttribute) {
      option.textContent = suggestion;
      option.addEventListener("mousedown", () => {
        input.value = `${suggestion}: `;
        dropdown.innerHTML = "";
        dropdown.style.display = "none";
        setTimeout(() => input.focus(), 0);
      });
    } else {
      const attributePart = userInput.split(":")[0].trim();
      option.textContent = `${attributePart}: ${suggestion}`;
      option.addEventListener("mousedown", () => {
        input.value = `${attributePart}: ${suggestion}`;
        addFilterElement(input, dropdown, list, listName, addToFilterList);
      });
    }

    dropdown.appendChild(option);
  });

  dropdown.style.display = suggestions.length > 0 ? "block" : "none";
}

function setupAutocomplete(inputId, list, listName, addToFilterList) {
  const input = document.getElementById(inputId);

  // Create a dropdown 
  const dropdown = document.createElement("div");
  dropdown.className = "autocomplete-dropdown";
  document.body.appendChild(dropdown);

  input.addEventListener("input", () => {
    const userInput = input.value.trim();
    const isAttribute = !userInput.includes(":");
    const suggestions = getSuggestions(userInput, isAttribute);

    positionDropdown(input, dropdown);

    fillDropdown({
      dropdown,
      suggestions,
      input,
      isAttribute,
      userInput,
      list,
      listName,
      addToFilterList,
    });
  });
  
}

function addToFilterList(item, list, listName) {
  if (list.some((entry) => entry.attribute === item.attribute && entry.value === item.value)) {
    return;
  }

  list.push(item);
  updateEvents();

  if (listName === "Include List") {
    displayFilterElements(
      list,
      document.getElementById("includeContainer"),
      removeFromInclude
    );
  } else if (listName === "Ignore List") {
    displayFilterElements(
      list,
      document.getElementById("excludeContainer"),
      removeFromExclude
    );
  }
}

function displayFilterElements(list, container, removeFilterElement) {
  const inputField = container.querySelector("input");

  // Clear input
  container.innerHTML = "";
  container.appendChild(inputField);

  // Create a filter display element for each filter element
  list.forEach((item) => {
    const filterElement = document.createElement("span");
    filterElement.className = "filter-element";
    filterElement.textContent = `${item.attribute}: ${item.value}`;

    // Create removal button
    const removeBtn = document.createElement("span");
    removeBtn.className = "filter-element-remove";
    removeBtn.textContent = " x";
    removeBtn.addEventListener("click", () => {
      removeFilterElement(item);
    });
    filterElement.appendChild(removeBtn);


    container.insertBefore(filterElement, inputField);
  });
}

function removeFromInclude(item) {
  const idx = includeList.findIndex(
    (x) => x.attribute === item.attribute && x.value === item.value
  );
  if (idx >= 0) includeList.splice(idx, 1);
  updateEvents();

  displayFilterElements(
    includeList,
    document.getElementById("includeContainer"),
    removeFromInclude
  );
}

function removeFromExclude(item) {
  const idx = ignoreList.findIndex(
    (x) => x.attribute === item.attribute && x.value === item.value
  );
  if (idx >= 0) ignoreList.splice(idx, 1);
  updateEvents();

  displayFilterElements(
    ignoreList,
    document.getElementById("excludeContainer"),
    removeFromExclude
  );
}

function filterEvents(events, startYear, endYear, include, exclude) {

  return events.filter((event) => {

    // Ensure the event falls within the timeline
    if (startYear !== null && endYear !== null) {
      if (event.year < startYear || event.year > endYear) {
        return false;
      }
    }

    // Check if the event matches any exclude condition
    const isExcluded = exclude.some(
      (condition) => event[condition.attribute] === condition.value
    );
    if (isExcluded) {
      return false;
    }

    // If include is empty, assume the event matches
    if (include.length === 0) {
      return true;
    }

    // Check if the event matches any include condition
    return include.some(
      (condition) => event[condition.attribute] === condition.value
    );

  });
}


function updateEvents() {
  let startYear = timelineStartYear;
  let endYear = timelineEndYear;

  const newEvents = filterEvents(eventData, timelineStartYear, timelineEndYear, includeList, ignoreList );

  document.getElementById("startYear").value = startYear;
  document.getElementById("endYear").value = endYear;

  const data = { startYear: startYear, endYear: endYear, events: newEvents};
  window.dispatchEvent(new CustomEvent("updateTimeline", { detail: data }));
}



// Set up Include and Ignore autocomplete
setupAutocomplete("includeText", includeList, "Include List", addToFilterList);
setupAutocomplete("excludeText", ignoreList, "Ignore List", addToFilterList);

updateEvents();

