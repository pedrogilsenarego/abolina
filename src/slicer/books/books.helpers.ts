import { firestore } from "./../../firebase/utils";
import { storage } from "./../../firebase/utils";

export const handleFetchBooks = ({ persistProducts = [] }) => {
  return new Promise((resolve, reject) => {
    const pageSize = 10;

    let ref = firestore.collection("books").limit(pageSize);

    ref
      .get()
      .then((snapshot: any) => {
        const totalCount = snapshot.size;

        const data = [
          ...persistProducts,
          ...snapshot.docs.map((doc: any) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export const handleFetchBook = (documentID: string) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("books")
      .doc(documentID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve(snapshot.data());
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleAddCoverPage = async (
  title: string,
  files: any,
  onProgressUpdate: (progress: number) => void
) => {
  const a = Array.prototype.slice.call(files);
  const c: any = [];
  let incrementLoad = 100 / a.length;
  let loadProgress = 0;

  const uploadImageAsPromise = (imageFile: any) => {
    return new Promise<void>((resolve, reject) => {
      storage
        .ref(`books/${title}/${imageFile.name}`)
        .put(imageFile)
        .then(() => {
          storage
            .ref("books")
            .child(title)
            .child(imageFile.name)
            .getDownloadURL()
            .then((url) => {
              resolve(url);
              console.log(url);
              loadProgress = loadProgress + incrementLoad;
              onProgressUpdate(~~loadProgress);
              c.push(url);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  for (var i = 0; i < a.length; i++) {
    var imageFile = a[i];
    await uploadImageAsPromise(imageFile);
  }
  return c;
};

export const handleAddBook = (payload: any) => {
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("books")
      .doc()
      .set(payload)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//
export const handleUpdateNewBookStatus = (payload: {
  value: string;
  documentID: string;
}) => {
  const { documentID, value } = payload;
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("books")
      .doc(documentID)
      .update({
        newBook: value,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//

export const handleUpdateCarroussellLink = (payload: { link: string, pos: number , title:string}) => {
  const { link, pos, title } = payload;
  
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("general")
      .doc("carrousell")
      .get()
      .then((doc) => {
        if (doc.exists) {
          const content = doc.data()?.content || [];

          // Update the link property of the object at the specified position
          content[pos].link = link;
          content[pos].title = title;

          // Update the content field with the updated array
          firestore
            .collection("general")
            .doc("carrousell")
            .update({
              content: content,
            })
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject(new Error("Document does not exist"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};


export const handleFetchCarroussell = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("general")
      .doc("carrousell")
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve(snapshot.data());
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleUpdateCarroussell = (content: string[]) => {
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("general")
      .doc("carrousell")
      .update({
        content,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleAddCarroussellImage = async (files: any) => {
  const a = Array.prototype.slice.call(files);
  const c: any = [];
  const uploadImageAsPromise = (imageFile: any) => {
    return new Promise<void>((resolve, reject) => {
      storage
        .ref(`carroussell/${imageFile.name}`)
        .put(imageFile)
        .then(() => {
          storage
            .ref("carroussell")
            .child(imageFile.name)
            .getDownloadURL()
            .then((url) => {
              resolve(url);
              console.log(url);
              c.push(url);
            });
        })
        .catch((err) => {
          reject(err);
        });
      // storageRef.on(
      //   "state_changed",
      //   (snapshot) => {
      //     // const progressD = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      //     // setProgress(progressD)
      //   },
    });
  };

  for (var i = 0; i < a.length; i++) {
    var imageFile = a[i];
    await uploadImageAsPromise(imageFile);
  }
  return c;
};

export const handleDeleteCarroussellStorage = async (list: {image:string,title:string,link:string}[]) => {
  if (list.length <= 1) return;
  console.log("list",list)
  const uploadImageAsPromise = (fileRef: any) => {
    return new Promise<void>((resolve, reject) => {
      fileRef
        .delete()
        .then(() => {
          resolve();
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  for (var i = 1; i < list.length; i++) {
    var imageFile = list[i].image;
    var fileRef = storage.refFromURL(imageFile);
    await uploadImageAsPromise(fileRef);
  }
};

export const handleDeleteBook = (documentID: string) => {
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("books")
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteBookStorage = async (title: string): Promise<void> => {
  // Define folderPath
  const folderPath = `books/${title}/`;

  const storageRef = storage.ref();
  const listRef = storageRef.child(folderPath);

  // Find all the prefixes and items.
  listRef
    .listAll()
    .then(async (res) => {
      // Process all the items under listRef
      const deletePromises: Promise<void>[] = res.items.map((itemRef) =>
        itemRef.delete()
      );
      await Promise.all(deletePromises);
      console.log("Folder deleted successfully");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.error("Error deleting folder:", error);
    });
};

export const handleEditBook = (payload: {
  values: any;
  documentID: string;
}) => {
  const { documentID, values } = payload;
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("books")
      .doc(documentID)
      .update(values) // update the document with the values object
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Collections
export const handleAddCollection = (payload: any) => {
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("collections")
      .doc()
      .set(payload)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchCollections = ({ persistProducts = [] }) => {
  return new Promise((resolve, reject) => {
    const pageSize = 10;

    let ref = firestore.collection("collections").limit(pageSize);

    ref
      .get()
      .then((snapshot: any) => {
        const totalCount = snapshot.size;

        const data = [
          ...persistProducts,
          ...snapshot.docs.map((doc: any) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export const handleFetchCollection = (documentID: string) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("collections")
      .doc(documentID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve(snapshot.data());
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchCollectionByName = (name: string) => {
  return new Promise((resolve, reject) => {
   
    firestore
      .collection("collections")
      .where("title", "==", name)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          resolve(data);
        } else {
          resolve(null); // Resolve with null if no matching document is found
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};


export const handleDeleteCollection = (documentID: string) => {
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("collections")
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleEditCollection = (payload: {
  values: any;
  documentID: string;
}) => {
  const { documentID, values } = payload;
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("collections")
      .doc(documentID)
      .update(values) // update the document with the values object
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

