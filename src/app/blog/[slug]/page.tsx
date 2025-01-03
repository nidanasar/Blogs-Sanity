// import React from 'react'
// import Image from 'next/image'
// import { client } from '@/sanity/lib/client'
// export default async function BlogDetail({params:{slug}}:{params:{slug:string}}) {
//   const query =`*[_type=='post' && slug.current== $"{slug}"]{
//   title, summary, image, contenet, author->{name, bio, image}
// }[0]`
// const post = await client.fetch(query)
//   function urlFor(image: any): string | import("next/dist/shared/lib/get-img-props").StaticImport {
//     throw new Error('Function not implemented.')
//   }

//   return (
//     <div>
//       <main className="min-h-screen bg-gray-100 py-10">
//       <section className="container mx-auto px-4 md:px-8">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//           {post.title}        </h1>
//         <div className="text-center">
//           <Image
//             src={urlFor(post.image)}
//             alt="blog-image"
//             width={800}
//             height={600}
//             className="mx-auto"
//           />
//         </div>
//         <section>
//           <h2 className="text-2xl font-bold text-gray-800 mt-8">
//           Summary </h2>
//           <p className="text-gray-800 mt-2">
//             {post.summary}</p>
//         <div className="text-gray-800 mt-8">
//             <p>{post.content}
//                 </p></div>
//       </section>
//       </section>
//     </main>

//     </div>
//   )
// }

import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image"; // Assuming you have this helper
import { PortableText } from "@portabletext/react";



export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title, summary, image, content, author->{name, bio, image}
  }`;

  const post = await client.fetch(query, { slug: params.slug });

 

  return (
    <div>
      <main className="min-h-screen bg-gray-100 py-10">
        <section className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            {post.title}
          </h1>
          <div className="text-center">
            <Image
              src={urlForImage(post.image)}
              alt={post.title}
              width={800}
              height={600}
              className="mx-auto"
            />
          </div>
          <section>
            <div>
              <h3 className=" font-bold text-gray-800 mt-8">
                {post.author.name}
              </h3>
              <p className="text-sm">
                {post.author.bio}
              </p>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-8">Summary</h2>
            <p className="text-gray-800 mt-2">{post.summary}</p>
            <div className="text-gray-800 mt-8">
              <PortableText value={post.content} />
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
