import { CopyOutlined } from '@ant-design/icons';

const SearchingSqlButton: React.FC<{ onCopy: () => void }> = ({ onCopy }) => {
    return (
        <>
            <div style={{
                position: 'absolute',
                right: 32,
                transform: 'translateY(15px)',
                opacity: 0.5,
            }}>
                <CopyOutlined onClick={onCopy} />
            </div>
        </>
    )
}

export default SearchingSqlButton