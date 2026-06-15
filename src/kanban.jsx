import { useState } from "react";
import "./kanban.css";

function Kanban() {

  // Input field ki value store karta hai
  const [complaint, setComplaint] = useState("");

  // Dropdown ki selected value store karta hai
  const [status, setStatus] = useState("new");

  // Drag hone wale card ki id store karta hai
  const [draggedItem, setDraggedItem] = useState(null);

  // Saari complaints array mein store hoti hain
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      text: "Water leakage in apartment 12A",
      status: "new",
    },
    {
      id: 2,
      text: "Broken street light near Block C",
      status: "new",
    },
    {
      id: 3,
      text: "Noise complaint from Block B",
      status: "progress",
    },
  ]);

  /*
   addComplaint()
   -----------------------
   Purpose:
   User ki complaint ko complaints array mein add karta hai.
  */
  const addComplaint = () => {

    // Empty input check
    if (complaint.trim() === "") {
      alert("Enter a complaint");
      return;
    }

    // New complaint object
    const newComplaint = {
      id: Date.now(), // unique id
      text: complaint,
      status: status,
    };

    // Existing complaints + new complaint
    setComplaints([...complaints, newComplaint]);

    // Input clear
    setComplaint("");

    // Default dropdown value
    setStatus("new");
  };

  /*
   deleteComplaint(id)
   -----------------------
   Purpose:
   Selected complaint ko remove karta hai.
  */
  const deleteComplaint = (id) => {

    const updatedComplaints =
      complaints.filter(
        (item) => item.id !== id
      );

    setComplaints(updatedComplaints);
  };

  /*
   handleDrop(newStatus)
   -----------------------
   Purpose:
   Dragged complaint ka status change karta hai.
  */
  const handleDrop = (newStatus) => {

    const updatedComplaints =
      complaints.map((item) => {

        // Sirf dragged complaint update hogi
        if (item.id === draggedItem) {

          return {
            ...item,
            status: newStatus,
          };
        }

        return item;
      });

    setComplaints(updatedComplaints);

    // Drag complete
    setDraggedItem(null);
  };

  return (
    <>
      <h2>Complaint Management Kanban</h2>

      {/* Top Section */}

      <div className="top-section">

        {/* Input Field */}
        <input
          type="text"
          placeholder="Complaint description..."
          value={complaint}

          /*
           onChange Event
           -------------------
           User jo type kare usay state mein save karta hai
          */
          onChange={(e) =>
            setComplaint(e.target.value)
          }
        />

        {/* Dropdown */}
        <select
          value={status}

          /*
           Dropdown ki value update karta hai
          */
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="new">New</option>
          <option value="progress">In-Progress</option>
          <option value="resolved">Resolved</option>
          <option value="canceled">Canceled</option>
        </select>

        {/* Add Button */}
        <button onClick={addComplaint}>
          Add
        </button>

      </div>

      {/* Board */}

      <div className="board">

        {/* New Column */}

        <div
          className="column new"

          // Drop allow karta hai
          onDragOver={(e) =>
            e.preventDefault()
          }

          // Drop hone par status update
          onDrop={() =>
            handleDrop("new")
          }
        >
          <h3>New Complaints</h3>

          {
            complaints
              .filter(
                (item) =>
                  item.status === "new"
              )
              .map((item) => (

                <div
                  key={item.id}
                  className="card"

                  // Card draggable hai
                  draggable

                  /*
                   onDragStart
                   ------------------
                   Drag hone wale card ki id save karta hai
                  */
                  onDragStart={() =>
                    setDraggedItem(item.id)
                  }
                >
                  {item.text}

                  {/* Delete Button */}

                  <span
                    onClick={() =>
                      deleteComplaint(item.id)
                    }
                  >
                    ×
                  </span>

                </div>
              ))
          }

        </div>

        {/* Progress Column */}

        <div
          className="column progress"
          onDragOver={(e) =>
            e.preventDefault()
          }
          onDrop={() =>
            handleDrop("progress")
          }
        >
          <h3>In-Progress</h3>

          {
            complaints
              .filter(
                (item) =>
                  item.status === "progress"
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="card"
                  draggable
                  onDragStart={() =>
                    setDraggedItem(item.id)
                  }
                >
                  {item.text}

                  <span
                    onClick={() =>
                      deleteComplaint(item.id)
                    }
                  >
                    ×
                  </span>

                </div>
              ))
          }

        </div>

        {/* Resolved Column */}

        <div
          className="column resolved"
          onDragOver={(e) =>
            e.preventDefault()
          }
          onDrop={() =>
            handleDrop("resolved")
          }
        >
          <h3>Resolved</h3>

          {
            complaints
              .filter(
                (item) =>
                  item.status === "resolved"
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="card"
                  draggable
                  onDragStart={() =>
                    setDraggedItem(item.id)
                  }
                >
                  {item.text}

                  <span
                    onClick={() =>
                      deleteComplaint(item.id)
                    }
                  >
                    ×
                  </span>

                </div>
              ))
          }

        </div>

        {/* Canceled Column */}

        <div
          className="column canceled"
          onDragOver={(e) =>
            e.preventDefault()
          }
          onDrop={() =>
            handleDrop("canceled")
          }
        >
          <h3>Canceled</h3>

          {
            complaints
              .filter(
                (item) =>
                  item.status === "canceled"
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="card"
                  draggable
                  onDragStart={() =>
                    setDraggedItem(item.id)
                  }
                >
                  {item.text}

                  <span
                    onClick={() =>
                      deleteComplaint(item.id)
                    }
                  >
                    ×
                  </span>

                </div>
              ))
          }

        </div>

      </div>
    </>
  );
}

export default Kanban; 