// import { useLocalization } from '@/hooks/useLocalization.ts';
// import { GraphQLList, GraphQLNamedType, GraphQLObjectType, GraphQLSchema, GraphQLType } from 'graphql/type';
// import classes from '@/components/EditorMain/editorMain.module.css';
// import { useState } from 'react';

// type DocsProps = {
//   schema?: GraphQLSchema;
// };

// const Docs = ({ schema }: DocsProps) => {
//   const { LocalizationData } = useLocalization();
//   const { graphiQLPage } = LocalizationData;

//   // TODO queryType navigation https://app.asana.com/0/1206001149209373/1206205253821605
//   const queryType = schema?.getQueryType();
//   const typeMap = schema?.getTypeMap();
//   console.log('queryType', queryType);
//   console.log('typeMap', typeMap);

//   const [selectedType, setSelectedType] = useState<string | null>(null);

//   const handleClickType = (typeName: string) => {
//     setSelectedType(typeName);
//   };
//   const renderSubtypes = (parentType: GraphQLNamedType | undefined) => {
//     if (!parentType) {
//       return null;
//     }

//     if (isObjectType(parentType)) {
//       const fields = (parentType as GraphQLObjectType).getFields();
//       const subtypes = Object.values(fields).map((field) => field.type);

//       return (
//         <div>
//           {subtypes.map((subtype) => (
//             <div key={getTypeName(subtype)}>
//               <p>{getTypeName(subtype)}</p>
//               {renderSubtypes(subtype as GraphQLNamedType)}
//             </div>
//           ))}
//         </div>
//       );
//     }

//     return null;
//   };
//   const isObjectType = (type: GraphQLNamedType): type is GraphQLObjectType => type instanceof GraphQLObjectType;
//   const getTypeName = (type: GraphQLType): string => {
//     return 'name' in type ? type.name : type instanceof GraphQLList ? getTypeName(type.ofType) : '';
//   };

//   return (
//     <div className={classes.docs}>
//       <h2>{graphiQLPage.docs}</h2>
//       <p className={classes.about}>{graphiQLPage.docsInstruction}</p>
//       {schema ? (
//         <div>
//           <h3 className={classes.subtitle}>&#10004; Root Types</h3>
//           <p>
//             query: <span className={classes.type}>{queryType?.name}</span>
//           </p>
//           <h3 className={classes.subtitle}>&#10004; All Schema Types</h3>
//           {Object.values(typeMap ?? {}).map((type) => (
//             <p className={classes.type} key={type.name}>
//               {type.name}
//             </p>
//           ))}
//         </div>
//       ) : (
//         <div>{graphiQLPage.docsNotFound}</div>
//       )}
//     </div>
//     // <div className={classes.docs}>
//     //   <h2>{graphiQLPage.docs}</h2>
//     //   <p className={classes.about}>{graphiQLPage.docsInstruction}</p>
//     //   {schema ? (
//     //     <div>
//     //       {selectedType ? (
//     //         <div>
//     //           <p>
//     //             <b>{selectedType}</b>
//     //           </p>
//     //           {/* Отображение подтипов выбранного типа */}

//     //           {renderSubtypes(schema.getType(selectedType))}
//     //         </div>
//     //       ) : (
//     //         <div>
//     //           {/* <p>{graphiQLPage.queryType}</p> */}
//     //           {Object.values(typeMap ?? {}).map((type) => (
//     //             <p key={type.name} onClick={() => handleClickType(type.name)}>
//     //               {type.name}
//     //             </p>
//     //           ))}
//     //         </div>
//     //       )}
//     //     </div>
//     //   ) : (
//     //     <div>{graphiQLPage.docsNotFound}</div>
//     //   )}
//     // </div>
//   );
// };

// export default Docs;

// import { useLocalization } from '@/hooks/useLocalization.ts';
// import { GraphQLList, GraphQLNamedType, GraphQLObjectType, GraphQLSchema, GraphQLType } from 'graphql/type';
// import classes from '@/components/EditorMain/editorMain.module.css';
// import { useState } from 'react';

// type DocsProps = {
//   schema?: GraphQLSchema;
// };
// type TypeNode = {
//   name: string;
//   description?: string | null;
//   subtypes?: TypeNode[];
// };

// const Docs = ({ schema }: DocsProps) => {
//   const { LocalizationData } = useLocalization();
//   const { graphiQLPage } = LocalizationData;
//   const [currentType, setCurrentType] = useState<TypeNode | null>(null);

//   const renderType = (type: TypeNode) => {
//     if (type.subtypes && type.subtypes.length > 0) {
//       // Показать список подтипов
//       return (
//         <div>
//           <h3>{type.name}</h3>
//           <ul>
//             {type.subtypes.map((subtype, ind) => (
//               <li key={ind} onClick={() => setCurrentType(subtype)}>
//                 {subtype.name}
//               </li>
//             ))}
//           </ul>
//           <button onClick={() => setCurrentType(null)}>Назад</button>
//         </div>
//       );
//     } else {
//       // Показать описание типа
//       return (
//         <div>
//           <h3>{type.name}</h3>
//           <p>{type.description}</p>
//           <button onClick={() => setCurrentType(null)}>Назад</button>
//         </div>
//       );
//     }
//   };

//   const buildTypeHierarchy = (parentType: GraphQLObjectType): TypeNode => {
//     const fields = parentType.getFields();
//     const subtypes: TypeNode[] = [];

//     for (const fieldName in fields) {
//       const fieldType = fields[fieldName].type;
//       if (fieldType instanceof GraphQLObjectType) {
//         subtypes.push(buildTypeHierarchy(fieldType));
//       }
//     }

//     return {
//       name: parentType.name,
//       description: parentType.description,
//       subtypes,
//     };
//   };

//   const handleRootTypeClick = () => {
//     if (schema) {
//       const rootQueryType = schema.getQueryType();
//       if (rootQueryType) {
//         setCurrentType(buildTypeHierarchy(rootQueryType));
//       }
//     }
//   };

//   return (
//     <div className={classes.docs}>
//       <h2>{graphiQLPage.docs}</h2>
//       <p className={classes.about}>{graphiQLPage.docsInstruction}</p>
//       {schema ? (
//         <div>
//           <h3 className={classes.subtitle}>&#10004; Root Types</h3>
//           <p>
//             query:
//             <span className={classes.type} onClick={handleRootTypeClick}>
//               {schema.getQueryType()?.name}
//             </span>
//           </p>
//           {currentType ? renderType(currentType) : null}
//         </div>
//       ) : (
//         <div>{graphiQLPage.docsNotFound}</div>
//       )}
//     </div>
//   );
// };
