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
        <div className="card p-3 shadow-sm">
            <form>
                <div className="row g-2 mb-3">
                    <div className="col-12 col-md-3">
                        <input className="w-100 p-1 rounded custom-input" type="text" placeholder="Enter person name" value={person} onChange={(e) => setPerson(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-3">
                        <input className="w-100 p-1 rounded custom-input" type="text" placeholder="Enter networks name" value={networks} onChange={(e) => setNetworks(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-3">
                        
                        <button type="button" className="btn btn-primary w-100" onClick={(e) => handleSubmit(e, 'unconnected')}>Check unconnected people</button>
                    </div>
                    <div className="col-12 col-md-3">                        
                        <button type="button" className="btn btn-primary w-100" onClick={(e) => handleSubmit(e, "influence")}>Check social influence</button>                        
                    </div>
                </div>
            </form>
        </div>
    )

};

export default SocialForm