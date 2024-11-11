import React, { useState } from "react";

interface SocialFormProps {
    onUnconnectedPeopleSubmit: (person: string, networks: string[]) => void;
}


const SocialForm: React.FC<SocialFormProps> = ({ onUnconnectedPeopleSubmit }) => {

    const [person, setPerson] = useState('');
    const [networks, setNetworks]= useState('');

    const handleUnconnectedPeopleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const networksArray = networks.split(',').map((net) => net.trim());
        onUnconnectedPeopleSubmit(person, networksArray)
    }

    return (
        <div>
            <form onSubmit={handleUnconnectedPeopleSubmit}>
                <input type="text" placeholder="Enter person name" value={person} onChange={(e) => setPerson(e.target.value)} />
                <input type="text" placeholder="Enter networks name" value={networks} onChange={(e) => setNetworks(e.target.value)}/>
                <button type="submit">Check unconnected people</button>
            </form>
        </div>
    )

};

export default SocialForm