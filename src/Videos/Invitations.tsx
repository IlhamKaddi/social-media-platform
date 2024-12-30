import React, { useState, useEffect } from "react";
import axios from "axios";

interface Invitation {
  id: number;
  sender_id: number;
  receiver_id: number;
  status: 'pending' | 'accepted' | 'rejected';
  sender: {
    id: number;
    name: string;
  };
}
function Invitations() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const profileId = localStorage.getItem("profile_id");

  // Fetch invitations for the logged-in user
  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/invitation-profile/${profileId}`);
        setInvitations(response.data.invitations);

        console.log(response.data)
      } catch (error) {
        console.log('error fetching invitations',error)
      }
    };

    fetchInvitations();

  }, [profileId]);

  // Handle status update (Accept or Reject)
  const handleResponse = async (invitationId: number, status: 'accepted' | 'rejected') => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/invitations/respond/${invitationId}`, { status });
      alert(response.data.message);

      // Update local state to reflect the new status
      setInvitations((prevInvitations) =>
        prevInvitations.map((invitation) =>
          invitation.id === invitationId ? { ...invitation, status } : invitation
        )
      );
    } catch (error) {
      console.error("Error updating invitation status:", error);
    }
  };

  return (
    <div>
      <h1>Your Invitations</h1>
      {invitations.length > 0 ? (
        invitations.map((invitation) => (
          <div key={invitation.id} className="invitation">
            <i className="bi bi-person-circle"></i>  
            <p>  <strong>{invitation.sender.name}</strong> sent you an invitation. </p>
             
            {/* <p>Status: {invitation.status}</p> */}
            {invitation.status === "pending" && (
              <div>
                <button
                  onClick={() => handleResponse(invitation.id, "accepted")}
                  className="btn btn-success"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleResponse(invitation.id, "rejected")}
                  className="btn btn-danger"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No invitations to display.</p>
      )}
    </div>
  );
}

export default Invitations;
