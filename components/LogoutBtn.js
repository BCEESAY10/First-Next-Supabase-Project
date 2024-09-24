"use client";

import React from "react";
import { LogOutIcon } from "lucide-react";

export default function LogoutBtn() {
  function performLogout() {
    fetch("/api/users/logout", {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message)
        location.href = "/"
      })
      .catch((error) => alert(error.message));
  }
  return (
    <div>
      <button className="text-black" onClick={performLogout}>
        <LogOutIcon />
      </button>
    </div>
  );
}
