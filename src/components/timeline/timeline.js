const compactW = 80,  compactH = 40;   
const expandedW = 200, expandedH = 120; 



const data = [
  { title: "Event A", description: "Description A", year: 1970 },
  { title: "Event B", description: "Description B", year: 1980 },
  { title: "Event C", description: "Description C", year: 1990 },
  { title: "Event D", description: "Description D", year: 2000 },
  { title: "Event E", description: "Description E", year: 2010 },
  { title: "Event F", description: "Description F", year: 2020 },
];

let startYear = 1950;
let endYear = 2050;
let events = [];

const svg = d3.select("#timeline");
const eventsContainer = d3.select("#events-container");

const timelineThickness = 2;
const padding = parseFloat(svg.style("width"))*1/9;     
const connectorLength = 60; 


function getX(year, width, startYear, endYear) {
  return padding + ((year - startYear)/(endYear - startYear)) * (width - 2*padding);
}

function drawTimeline() {
  const width = parseFloat(svg.style("width"));
  const height = parseFloat(svg.style("height"));

  svg.selectAll("*").remove();
  eventsContainer.selectAll("*").remove();

  drawHorozontalLine(width, height);
  svg.append("text")
    .attr("x", padding/2-5)
    .attr("y", (height / 2)+5)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("fill", "white")
    .text(startYear);
  
    svg.append("text")
    .attr("x", width-padding/2+5)
    .attr("y", (height / 2)+5)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("fill", "white")
    .text(endYear);

  events.forEach((d, i) => {
    createEvent(d,i, width, height, startYear, endYear);
  })
}

function drawTimelineHelper(event) {
  startYear = event.detail.startYear;
  endYear = event.detail.endYear;
  events = event.detail.events;
  drawTimeline();
}

function createEvent(d, i, width, height, startYear, endYear) {
  const xPos = getX(d.year, width, startYear, endYear);
  const isUp = (i % 2 === 0);
  const yPos = height/2 + connectorLength*((-1)**(i%2+1));

  // Draw vertical connector
  svg.append("line")
    .attr("x1", xPos)
    .attr("y1", height / 2)
    .attr("x2", xPos)
    .attr("y2", yPos)
    .attr("stroke", "white")
    .attr("stroke-width", 2);

  // Draw year of event
  const yearLabelOffset = isUp ? 15 : -5;
  svg.append("text")
    .attr("x", xPos)
    .attr("y", (height / 2) + yearLabelOffset)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "white")
    .text(d.year);


  const left = xPos - compactW / 2;
  const top  = yPos - compactH / 2;

  const container = eventsContainer
    .append("div")
    .attr("class", "event-container")
    .style("width",  compactW + "px")
    .style("height", compactH + "px")
    .style("left", left + "px")
    .style("top",  top + "px");

  
  container.on("mouseover", function() {
    // Adjust dimensions for expanded container
    d3.select(this)
      .style("width",  expandedW + "px")
      .style("height", expandedH + "px")
      .style("left", left-(expandedW-compactW)/2 + "px");
    
    if (isUp) {
      d3.select(this).style("top", top-(expandedH-compactH) + "px");
    }

    d3.select(this).select(".compact-box")
      .style("display", "none");
    d3.select(this).select(".expanded-box")
      .style("display", "flex");

  })
  .on("mouseout", function() {
    d3.select(this)
      .style("width",  compactW + "px")
      .style("height", compactH + "px")
      .style("left", (xPos - compactW/2) + "px")
      .style("top",  (yPos - compactH/2) + "px");

    d3.select(this).select(".compact-box")
      .style("display", "flex");
    d3.select(this).select(".expanded-box")
      .style("display", "none");
  })
  .on("click", () => {
    console.log("Clicked event:", d.title);
  });

  container.append("div")
    .attr("class", "compact-box")
    .style("width",  compactW + "px")
    .style("height", compactH + "px")
    .text(d.title);

  const expBox = container.append("div")
    .attr("class", "expanded-box")
    .style("width",  expandedW + "px")
    .style("height", expandedH + "px");

  expBox.append("div")
    .attr("class", "title")
    .text(d.title);
  expBox.append("div")
    .attr("class", "character")
    .text(`Character: ${d.character}`);
  expBox.append("div")
    .attr("class", "location")
    .text(`Location: ${d.location}`);
  expBox.append("div")
    .attr("class", "description")
    .text(`Description: ${d.description}`);
}


function drawHorozontalLine(width, height) {
  svg.append("line")
    .attr("x1", padding*7/10)
    .attr("y1", height / 2)
    .attr("x2", width - padding*7/10)
    .attr("y2", height / 2)
    .attr("stroke", "white")
    .attr("stroke-width", timelineThickness);

}

window.addEventListener("resize", drawTimeline);
window.addEventListener("updateTimeline", drawTimelineHelper)


