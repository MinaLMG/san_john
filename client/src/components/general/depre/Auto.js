// import { useEffect, useRef, useState } from "react";
// import classes from "./Auto.module.css";
// export default function Auto(props) {
//   const [display, setDisplay] = useState(false);
//   const [options, setOptions] = useState([]);
//   const [search, setSearch] = useState("");
//   const wrapperRef = useRef(null);

//   useEffect(() => {
//     const pokemon = props.data;
//     // const promises = new Array(20)
//     //   .fill()
//     //   .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
//     // Promise.all(promises).then((pokemonArr) => {
//     //   return pokemonArr.map((value) =>
//     //     value
//     //       .json()
//     //       .then(({ name, sprites: { front_default: sprite } }) =>
//     //         pokemon.push({ name, sprite })
//     //       )
//     //   );
//     // });

//     setOptions(pokemon);
//   }, []);

//   useEffect(() => {
//     window.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       window.removeEventListener("mousedown", handleClickOutside);
//     };
//   });

//   const handleClickOutside = (event) => {
//     const { current: wrap } = wrapperRef;
//     if (wrap && !wrap.contains(event.target)) {
//       setDisplay(false);
//     }
//   };

//   const updatePokeDex = (poke) => {
//     setSearch(poke);
//     setDisplay(false);
//   };

//   return (
//     <div
//       ref={wrapperRef}
//       className={`${classes["flex-container"]} ${classes["flex-column"]} ${classes["pos-rel"]}`}
//     >
//       <input
//         id="auto"
//         onClick={() => setDisplay(!display)}
//         placeholder="Type to search"
//         value={search}
//         onChange={(event) => setSearch(event.target.value)}
//       />
//       {display && (
//         <div className={classes["autoContainer"]}>
//           {options
//             .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
//             .map((value, i) => {
//               return (
//                 <div
//                   onClick={() => updatePokeDex(value.name)}
//                   className={classes["option"]}
//                   key={i}
//                   tabIndex="0"
//                 >
//                   <span>{value.name}</span>
//                 </div>
//               );
//             })}
//         </div>
//       )}
//     </div>
//   );
// }
