// beforeEach(() => {
//     fetchMock.resetMocks(); // Reset mocks before each test
// });
  
test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

//DONE
test("/postNote - Post a note", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");
});

//DONE
test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
    // Code here

    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);

    const getAllNotesBody = await getAllNotesRes.json();

    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response).toEqual([]);
});

//todo
// test("/getAllNotes - Return list of two notes for getAllNotes", async () => {

//      const title1 = "NoteTitleTest111";
//      const content1 = "NoteTitleContent";
//      const title2 = "NoteTitleTest222";
//      const content2 = "NoteTitleContent";
//      // Post the first note
//      await fetch(`${SERVER_URL}/postNote`, {
//          method: "POST",
//          headers: {
//              "Content-Type": "application/json",
//          },
//          body: JSON.stringify({
//              title: title1,
//              content: content1,
//          }),
//      });
 
//      //Post the second note
//      await fetch(`${SERVER_URL}/postNote`, {
//          method: "POST",
//          headers: {
//              "Content-Type": "application/json",
//          },
//          body: JSON.stringify({
//              title: title2,
//              content: content2,
//          }),
//      });
 
//      // Make a GET request to fetch all notes
//      const getAllNotesRes = await fetch("http://localhost:4000/getAllNotes");
 
//      const getAllNotesBody = await getAllNotesRes.json();
    
//      console.log(getAllNotesBody);
//      // Assertions
//      expect(getAllNotesRes.status).toBe(200);
 
//      expect(getAllNotesBody.response).toEqual(
//        expect.arrayContaining([ // This ensures that the received array contains objects that match the expected ones
//          expect.objectContaining({ title: title1, content: content1 }),
//          expect.objectContaining({ title: title2, content: content2 }),
//        ])
//      );

// });

test("/deleteNote - Delete a note", async () => {
    const title = "delete_testing";
    const content = "NoteTitleContent";
    
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();
    const noteId = postNoteBody.insertedId; // Adjust this line based on your API's response structure
    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    //console.log(deleteNoteRes);
    const deleteNoteBody = await deleteNoteRes.json();

    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
    const title = "New_NoteTitleTest";
    const content = "New_NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();
    const noteId = postNoteBody.insertedId;

    const patchedTitle = "Test_Patch_NoteTitleTest";
    const patchedContent = "Test_Patch_NoteTitleContent";
    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: patchedTitle,
            content: patchedContent,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/patchNote - Patch with just title", async () => {
    const title = "New_NoteTitleTest";
    const content = "New_NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();
    const noteId = postNoteBody.insertedId;

    const patchedTitle = "Test_Patch_JustNoteTitleTest";
    //const patchedContent = "Test_Patch_NoteTitleContent";
    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: patchedTitle,
            content: content,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
  });

test("/patchNote - Patch with just content", async () => {
    const title = "New_NoteTitleTest";
    const content = "New_NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();
    const noteId = postNoteBody.insertedId;

    //const patchedTitle = "Test_Patch_NoteTitleTest";
    const patchedContent = "Test_Patch_NoteTitleContent";
    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: patchedContent,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/deleteAllNotes - Delete one note", async () => {
    // Code here
    const title = "NoteTitle";
    const content = "NoteContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();
    const noteId = postNoteBody.insertedId;

    const deleteNoteRes = await fetch(`http://localhost:4000/deleteNote/${noteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const deleteNoteBody = await deleteNoteRes.json();
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    // First, create a note to ensure there's a note to update.
    const title = "Note for Color Update";
    const content = "Content of the note before color update";
    //const initialColor = "#FFFFFF"; // Assuming your note creation supports specifying an initial color

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
    });

    const postNoteBody = await postNoteRes.json();
    const noteId = postNoteBody.insertedId; // Adjust according to how your API returns the ID

    // Now, update the color of the note to red (#FF0000)
    const newColor = "#FF0000";
    const updateColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ color: newColor }),
    });

    const updateColorBody = await updateColorRes.json();
    console.log(updateColorBody);

    // Assertions to validate the response
    expect(updateColorRes.status).toBe(200);
    // Adjust the expected response message according to your actual API implementation
    expect(updateColorBody.message).toBe("Note color updated successfully.");
});