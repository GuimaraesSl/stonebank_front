import React from 'react'

interface TagsDetailProps {
  tag: string
}

export const TagsDescription: React.FC<TagsDetailProps> = ({
  tag,
}: TagsDetailProps) => {
  return (
    <div className="detailInfo-tags" data-test-id="tag-description">
      <div> Suas TAGs </div>
      <strong> {tag} </strong>
    </div>
  )
}
