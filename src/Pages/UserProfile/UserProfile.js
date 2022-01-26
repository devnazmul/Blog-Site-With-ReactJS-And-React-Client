import React from 'react';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
    const id = useParams();
  return <div>
      this is profile of {id}
  </div>;
}
