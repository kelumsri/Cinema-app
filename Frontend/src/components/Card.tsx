
import React from 'react';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

interface CardData {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

interface CustomCardProps {
  cardData: CardData[];
}

const CustomCard: React.FC<CustomCardProps> = ({ cardData }) => {
  const chunkArray = (array: any[], size: number): any[][] => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  };

  const chunkedCardData = chunkArray(cardData, 6);

  return (
    <>
      {chunkedCardData.map((chunk, index) => (
        <div key={index} style={{ display: 'flex', overflowX: 'auto', paddingTop: 24 }}>
          {chunk.map((card) => (
            <Card
              key={card.id}
              style={{ width: 300, margin: '0 20px' }}
              cover={<img alt={`example${card.id}`} src={card.imageUrl} style={{height:350}} />}
              actions={[
                // <Link
                //   to={{
                //     pathname: `/card/${card.id}`, // Update the URL to include card ID
                //     search: `?id=${card.id}&title=${encodeURIComponent(card.title)}&${encodeURIComponent(card.description)}`
                //   }}
                //   key={`button${card.id}`}
                // >
                //   <Button>Book tickets</Button>
                // </Link>,
                <Link
                  to={{
                    pathname: `/card/${card.id}`, // Update the URL to include card ID
                    search: `?id=${card.id}&title=${encodeURIComponent(card.title)}&description=${encodeURIComponent(card.description)}`
                  }}
                  key={`button${card.id}`}
                >
  <Button>Book tickets</Button>
</Link>

              ]}
            >
              <Meta title={card.title} description={card.description} />
            </Card>
          ))}
        </div>
      ))}
    </>
  );
};

export default CustomCard;
