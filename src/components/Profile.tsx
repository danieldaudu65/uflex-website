import React from 'react'

type User = {
  name: string
}

const Profile:React.FC = () => {
    const user: User = { name: "Dan" }

    return (
        <div>
            <p>Hi {user.name}</p>
            <p>Ready for your next journey</p>
        </div>
    )
}

export default Profile
