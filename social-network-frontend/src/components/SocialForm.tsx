import React, { useState } from "react";

interface SocialFormProps {
    onUnconnectedPeopleSubmit: (person: string, networks: string[]) => void;
    onSocialInfluenceSubmit: (person: string, networks: string[]) => void;
}


const SocialForm: React.FC<SocialFormProps> = ({ onUnconnectedPeopleSubmit, onSocialInfluenceSubmit }) => {

    const [person, setPerson] = useState('');
    const [networks, setNetworks] = useState('');

    const handleSubmit = (e: React.FormEvent, type: 'unconnected' | 'influence') => {
        e.preventDefault();
        const networksArray = networks.split(',').map((net) => net.trim());

        if (type === 'unconnected') {
            onUnconnectedPeopleSubmit(person, networksArray);
        } else {
            onSocialInfluenceSubmit(person, networksArray)
        }
    };

    return (
        <div>
            <form>
                <input type="text" placeholder="Enter person name" value={person} onChange={(e) => setPerson(e.target.value)} />
                <input type="text" placeholder="Enter networks name" value={networks} onChange={(e) => setNetworks(e.target.value)} />
                <button type="button" onClick={(e) => handleSubmit(e, 'unconnected')}>Check unconnected people</button>
                <button type="button" onClick={(e) => handleSubmit(e, "influence")}>Check social influence</button>
            </form>
        </div>
    )

};

export default SocialForm