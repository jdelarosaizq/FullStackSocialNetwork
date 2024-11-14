import axios from 'axios';
import { Relationship, Person } from '../types/types';


export const getUnconnectedPeople = async(networks:string[]): Promise<number> => {
    // const response = await axios.get(`https://external-network/${networks}`);
    //Dummy data
    const response = {data: {
        "sn": "facebook",
        "people": [{"name":"John"},{"name":"Harry"},{"name":"Peter"}, {"name": "George"}, {"name": "Anna"}],
        "relationships": [
            {"type": "HasConnection", "startNode": "John", "endNode": "Peter"},
            {"type": "HasConnection", "startNode": "John", "endNode": "George"},
            {"type": "HasConnection", "startNode": "Peter", "endNode": "George"},
            {"type": "HasConnection", "startNode": "Peter", "endNode": "Anna"}
        ]
        }}

    const {people, relationships} = response.data;

    const connected = new Set(relationships.flatMap((rel:Relationship) => [rel.startNode, rel.endNode]))
    return people.filter((person:{name:string}) => !connected.has(person.name)).length;
};

export const getSocialInfluence = async (person: string, networks: string[] ) => {
    const allRelationships: Relationship[] = [];
  
    // Step 1: Gather relationships from all specified networks
    for (const network of networks) {
      // const response = await axios.get(`https://my-third-party/${network}`);
      const response = {data: {
        "sn": "facebook",
        "people": [{"name":"John"},{"name":"Harry"},{"name":"Peter"}, {"name": "George"}, {"name": "Anna"}],
        "relationships": [
            {"type": "HasConnection", "startNode": "John", "endNode": "Peter"},
            {"type": "HasConnection", "startNode": "John", "endNode": "George"},
            {"type": "HasConnection", "startNode": "Peter", "endNode": "George"},
            {"type": "HasConnection", "startNode": "Peter", "endNode": "Anna"}
        ]
        }}
      allRelationships.push(...response.data.relationships);
    }
  
    // Step 2: Calculate 1st and 2nd-degree connections across all networks
    const degrees = calculateDegreesOfSeparation(person, allRelationships);
  
    return degrees;
  };

  const calculateDegreesOfSeparation = (
    person: string,
    relationships: Relationship[]
  ): { firstDegreeCount: number; secondDegreeCount: number } => {
    
    console.log("person:", person, "relationships:", relationships)
    const firstDegreeConnections = new Set<string>();
    const secondDegreeConnections = new Set<string>();
  
    // Step 1: Find 1st-degree connections
    relationships.forEach((rel) => {
      if (rel.startNode === person) {
        firstDegreeConnections.add(rel.endNode);
      } else if (rel.endNode === person) {
        firstDegreeConnections.add(rel.startNode);
      }
    });
  
    // Step 2: Find 2nd-degree connections
    firstDegreeConnections.forEach((friend) => {
      relationships.forEach((rel) => {
        if (rel.startNode === friend && !firstDegreeConnections.has(rel.endNode) && rel.endNode !== person) {
          secondDegreeConnections.add(rel.endNode);
        }
        if (rel.endNode === friend && !firstDegreeConnections.has(rel.startNode) && rel.startNode !== person) {
          secondDegreeConnections.add(rel.startNode);
        }
      });
    });
  
    return {
      firstDegreeCount: firstDegreeConnections.size,
      secondDegreeCount: secondDegreeConnections.size,
    };
  };
  
