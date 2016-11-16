import {readDocument, writeDocument, addDocument, readCollection} from './database.js';
/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
    setTimeout(() => {
        cb(data);
    }, 4);
}

export function postNewGroup(id, owner_id, name, email, description, filepath, event_ids, cb) {
    var newGroup = {
        "_id": id,
        "owner": owner_id, //managing user
        "name": name,
        "email": email, //main email for group
        "desc": description,
        "photo": filepath,
        "events": event_ids
    };
    // Write the new group to the document
    newGroup = addDocument('Groups', newGroup);
    // Fetch the associated user
    var userData = readDocument('Users', owner_id);
    // add the new group to the user Data
    userData.groups.unshift(newGroup._id);
    emulateServerReturn(newGroup, cb);
}

export function postNewEvent(eventToPost, cb) {
    //This Function takes an event JSON and writes it to the server. See Eventscreat.js
    var blankEvent = {
        data: {
            eventName: "",
            organizer: "",
            loc: "",
            onetime: "",
            datetime: "",
            reoccuring: "",
            weekday: "",
            time: "",
            desc: "",
            contactInfo: ""
        }
    };
    addDocument('Events', eventToPost);
    // Fetch the associated group
    var groupData = readDocument('Groups', eventToPost.organizer);
    // add the new event to the group Data
    groupData.events.unshift(eventToPost._id);
    // Write back to the document the new group data
    writeDocument('Groups',groupData);
    emulateServerReturn(blankEvent, cb);
}

export function getScheduledEvents(user_id, cb) {
    var userData = readDocument('Users', user_id);
    var events = userData.events.map((event_id) => readDocument('Events', event_id));
    //events = events.forEach((event) => event.owner = readDocument('Groups',event.owner));
    emulateServerReturn(events, cb);
}

export function getUpcomingEvents(cb) {
    var number = 3;
    var i = 1;
    var result = {};
    var eventData;
    while (i < number) {
        eventData = readDocument('Events', i);
        result.push(eventData);
        i = i + 1;
    }
    emulateServerReturn(result, cb);
}

export function searchEvents(user_id,searchInput, days, after, before, cb) {
  var unfiltered_results = [];
  var searchField = searchInput.toLowerCase();
  var userData = readDocument('Users', user_id);
  var user_events = userData.events.map((event_id) => readDocument('Events', event_id));
  var all_events = readCollection('Events');
  var length = Object.keys(all_events).length;
  console.log(searchField);
  for (var i=1 ; i < length; i++)
  {
  if (all_events[i].name.toLowerCase().includes(searchField) ||
    all_events[i].days.includes(days) ||
    all_events[i].after >= after ||
    (all_events[i].after + all_events[i].length) < before
      )
    {
      unfiltered_results.push(all_events[i]);
    }

  }
  //var filtered_result = all_events.map((event_id) => !user_events.includes(event_id))
  console.log(unfiltered_results);
  emulateServerReturn(unfiltered_results, cb);
}

export function getUserData(user_id, cb) {
    var user = readDocument('Users', user_id);
    emulateServerReturn(user, cb);
}

export function getUserGroups(user_id, cb) {
  var userData = readDocument('Users', user_id);
  var groups = userData.groups.map((group_id) => readDocument('Groups', group_id));
  emulateServerReturn(groups, cb);
}

export function getUserEvents(user_id, cb) {
  
}
